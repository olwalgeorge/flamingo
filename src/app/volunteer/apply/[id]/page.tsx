'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, MapPin, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import PhoneInput from '@/components/PhoneInput';
import { DEFAULT_COUNTRY_CODE, validatePhoneNumber } from '@/utils/countryCodes';
import { 
  getVolunteerPositionById, 
  applicationFormFields,
  type VolunteerApplicationFormData,
  type VolunteerPosition
} from '@/data/volunteerPositions';

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

export default function VolunteerApplication() {
  const params = useParams();
  const router = useRouter();
  const positionId = params?.id as string;
  
  const [position, setPosition] = useState<VolunteerPosition | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<VolunteerApplicationFormData>>({
    phoneCountryCode: DEFAULT_COUNTRY_CODE, // Default to Kenya
    emergencyPhoneCountryCode: DEFAULT_COUNTRY_CODE
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [stepErrors, setStepErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (positionId) {
      const pos = getVolunteerPositionById(positionId);
      if (pos) {
        setPosition(pos);
      } else {
        router.push('/volunteer');
      }
    }
  }, [positionId, router]);

  const steps = [
    { title: 'Personal Information', fields: applicationFormFields.personalInfo },
    { title: 'Address', fields: applicationFormFields.address },
    { title: 'Emergency Contact', fields: applicationFormFields.emergencyContact },
    { title: 'Availability', fields: applicationFormFields.availability },
    { title: 'Experience', fields: applicationFormFields.experience },
    { title: 'Motivation', fields: applicationFormFields.motivation },
    { title: 'Additional Information', fields: applicationFormFields.additionalInfo },
    { title: 'References', fields: applicationFormFields.references },
    { title: 'Review & Submit', fields: [] }
  ];

  const handleInputChange = (name: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific errors when user starts typing
    if (stepErrors[name]) {
      setStepErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentFields = steps[currentStep].fields;
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    currentFields.forEach((field: FormField) => {
      const value = formData[field.name as keyof VolunteerApplicationFormData];
      
      if (field.required) {
        if (!value || (typeof value === 'string' && !value.trim()) || 
            (Array.isArray(value) && value.length === 0)) {
          newErrors[field.name] = `${field.label} is required`;
          isValid = false;
        }
      }

      // Email validation
      if (field.type === 'email' && value && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = 'Please enter a valid email address';
          isValid = false;
        }
      }

      // Phone validation
      if ((field.name === 'phone' || field.name === 'emergencyPhone') && value && typeof value === 'string') {
        if (!validatePhoneNumber(value)) {
          newErrors[field.name] = 'Please enter a valid phone number';
          isValid = false;
        }
      }

      // Date of birth validation
      if (field.name === 'dateOfBirth' && value && typeof value === 'string') {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 16 || age > 100) {
          newErrors[field.name] = 'You must be between 16 and 100 years old';
          isValid = false;
        }
      }
    });

    setStepErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setErrors([]); // Clear general errors when moving to next step
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors([]);

    try {
      // Basic form validation
      const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof VolunteerApplicationFormData]?.toString().trim());
      
      if (missingFields.length > 0) {
        setErrors([`Please fill in all required fields: ${missingFields.join(', ')}`]);
        setIsSubmitting(false);
        return;
      }

      if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setErrors(['Please enter a valid email address']);
          setIsSubmitting(false);
          return;
        }
      }

      // Submit to API
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          positionId,
          formData
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      // Redirect to success page
      router.push('/volunteer/application-success');
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors([error instanceof Error ? error.message : 'An error occurred while submitting your application. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name as keyof VolunteerApplicationFormData];
    const error = stepErrors[field.name];

    // Special handling for phone numbers with country codes
    if (field.type === 'tel') {
      const countryCodeField = field.name === 'phone' ? 'phoneCountryCode' : 
                              field.name === 'emergencyPhone' ? 'emergencyPhoneCountryCode' : null;
      
      if (countryCodeField) {
        const selectedCountryCode = formData[countryCodeField as keyof VolunteerApplicationFormData] as string || DEFAULT_COUNTRY_CODE;
        
        return (
          <PhoneInput
            id={field.name}
            value={value as string || ''}
            countryCode={selectedCountryCode}
            onPhoneChange={(phone) => handleInputChange(field.name, phone)}
            onCountryCodeChange={(countryCode) => handleInputChange(countryCodeField, countryCode)}
            placeholder="712345678"
            required={field.required}
            error={error}
            compact={true}
          />
        );
      }
    }

    const inputClassName = `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
      error ? 'border-red-300 focus:ring-red-500' : ''
    }`;

    let inputElement;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'date':
        inputElement = (
          <input
            type={field.type}
            id={field.name}
            value={value as string || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className={inputClassName}
          />
        );
        break;
      
      case 'textarea':
        inputElement = (
          <textarea
            id={field.name}
            value={value as string || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            rows={4}
            className={inputClassName}
          />
        );
        break;
      
      case 'select':
        inputElement = (
          <select
            id={field.name}
            value={value as string || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className={inputClassName}
          >
            <option value="">Select an option</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
        break;
      
      case 'radio':
        inputElement = (
          <div className="space-y-2">
            {field.options?.map((option: string) => (
              <label key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  required={field.required}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
        break;
      
      case 'checkbox-group':
        const currentValues = (value as string[]) || [];
        inputElement = (
          <div className="space-y-2">
            {field.options?.map((option: string) => (
              <label key={option} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={currentValues.includes(option)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleInputChange(field.name, newValues);
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
        break;
      
      default:
        return null;
    }

    return (
      <div>
        {inputElement}
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  };

  const renderReviewStep = () => {
    if (!position) return null;

    return (
      <div className="space-y-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Position Applied For</h3>
          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-gray-900">{position.title}</h4>
            <div className="flex items-center text-gray-600 space-x-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {position.location}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {position.duration}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
              <p><span className="font-medium">Email:</span> {formData.email}</p>
              <p><span className="font-medium">Phone:</span> {formData.phoneCountryCode} {formData.phone}</p>
              <p><span className="font-medium">Date of Birth:</span> {formData.dateOfBirth}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Emergency Contact</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p><span className="font-medium">Name:</span> {formData.emergencyName}</p>
              <p><span className="font-medium">Relationship:</span> {formData.emergencyRelationship}</p>
              <p><span className="font-medium">Phone:</span> {formData.emergencyPhoneCountryCode} {formData.emergencyPhone}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p><span className="font-medium">Street:</span> {formData.street}</p>
              <p><span className="font-medium">City:</span> {formData.city}</p>
              <p><span className="font-medium">State/County:</span> {formData.state}</p>
              <p><span className="font-medium">Postal Code:</span> {formData.zipCode}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Availability</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p><span className="font-medium">Preferred Days:</span> {(formData.preferredDays as string[])?.join(', ')}</p>
              <p><span className="font-medium">Weekly Hours:</span> {formData.weeklyHours}</p>
              <p><span className="font-medium">Start Date:</span> {formData.startDate}</p>
            </div>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!position) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/volunteer" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Volunteer Opportunities
          </Link>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Apply for: {position.title}
            </h1>
            <div className="flex items-center text-gray-600 space-x-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {position.location}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {position.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps[currentStep].title}
            </h2>
          </div>

          <div className="p-6">
            {/* Display step validation errors */}
            {Object.keys(stepErrors).length > 0 && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
                    <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                      {Object.values(stepErrors).map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {currentStep === steps.length - 1 ? (
              renderReviewStep()
            ) : (
              <div className="space-y-6">
                {steps[currentStep].fields.map((field: FormField) => (
                  <div key={field.name}>
                    <label 
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
