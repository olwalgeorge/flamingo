'use client';

import { useState, useRef } from 'react';
import { 
  ArrowLeft, Save, Calendar, Users, 
  Plus, X, Eye, Settings, FileText, Image as ImageIcon,
  ChevronLeft, ChevronRight, AlertCircle, CheckCircle,
  BookOpen, Tag
} from 'lucide-react';
import Link from 'next/link';

interface EventFormData {
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  coordinates: { lat: number; lng: number } | null;
  maxAttendees: number;
  registrationDeadline: string;
  registrationFee: number;
  currency: string;
  organizer: string;
  contact: string;
  phone: string;
  website: string;
  requirements: string[];
  agenda: Array<{ time: string; activity: string; details: string; speaker?: string }>;
  materials: string[];
  outcomes: string[];
  prerequisites: string[];
  tags: string[];
  image: string;
  isPublic: boolean;
  allowWaitlist: boolean;
  sendReminders: boolean;
  collectFeedback: boolean;
  recordAttendance: boolean;
  certificateTemplate: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events: number;
  isSelected: boolean;
}

export default function NewEventPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    fullDescription: '',
    category: 'meeting',
    date: '',
    startTime: '09:00',
    endTime: '17:00',
    location: '',
    address: '',
    coordinates: null,
    maxAttendees: 50,
    registrationDeadline: '',
    registrationFee: 0,
    currency: 'KES',
    organizer: 'FCC CBO',
    contact: 'info@fcc-cbo.org',
    phone: '+254 xxx xxx xxx',
    website: '',
    requirements: [],
    agenda: [{ time: '09:00', activity: '', details: '', speaker: '' }],
    materials: [],
    outcomes: [],
    prerequisites: [],
    tags: [],
    image: '/placeholder-event.svg',
    isPublic: true,
    allowWaitlist: true,
    sendReminders: true,
    collectFeedback: true,
    recordAttendance: true,
    certificateTemplate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Create refs for required fields
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const maxAttendeesRef = useRef<HTMLInputElement>(null);

  const fieldRefs = {
    title: titleRef,
    description: descriptionRef,
    category: categoryRef,
    date: dateRef,
    startTime: startTimeRef,
    endTime: endTimeRef,
    location: locationRef,
    contact: contactRef,
    maxAttendees: maxAttendeesRef
  };

  const steps = [
    { id: 1, title: 'Basic Info', icon: FileText },
    { id: 2, title: 'Schedule & Location', icon: Calendar },
    { id: 3, title: 'Registration', icon: Users },
    { id: 4, title: 'Content', icon: BookOpen },
    { id: 5, title: 'Settings', icon: Settings },
    { id: 6, title: 'Review', icon: Eye }
  ];

  const categories = [
    { value: 'environmental', label: 'Environmental', color: 'bg-green-500' },
    { value: 'meeting', label: 'Meeting', color: 'bg-blue-500' },
    { value: 'educational', label: 'Educational', color: 'bg-purple-500' },
    { value: 'training', label: 'Training', color: 'bg-yellow-500' },
    { value: 'skills', label: 'Skills Development', color: 'bg-pink-500' },
    { value: 'conference', label: 'Conference', color: 'bg-indigo-500' },
    { value: 'fundraising', label: 'Fundraising', color: 'bg-red-500' },
    { value: 'community', label: 'Community Building', color: 'bg-teal-500' }
  ];

  // Calendar functions
  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: CalendarDay[] = [];
    
    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      days.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        events: 0,
        isSelected: false
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      days.push({
        date: dayDate,
        isCurrentMonth: true,
        events: Math.floor(Math.random() * 3), // Mock events count
        isSelected: dayDate.toDateString() === (formData.date ? new Date(formData.date).toDateString() : '')
      });
    }
    
    // Next month days
    const remainingSlots = 42 - days.length;
    for (let day = 1; day <= remainingSlots; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        events: 0,
        isSelected: false
      });
    }
    
    return days;
  };

  const selectDate = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }));
    setShowCalendar(false);
  };

  const navigateCalendar = (direction: 'prev' | 'next') => {
    setCurrentCalendarDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Form validation
  const validateStep = (step: number, shouldSetErrors: boolean = true): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        break;
      case 2:
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.startTime) newErrors.startTime = 'Start time is required';
        if (!formData.endTime) newErrors.endTime = 'End time is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (formData.startTime >= formData.endTime) {
          newErrors.endTime = 'End time must be after start time';
        }
        break;
      case 3:
        if (formData.maxAttendees < 1) newErrors.maxAttendees = 'Must allow at least 1 attendee';
        if (!formData.contact.trim()) newErrors.contact = 'Contact email is required';
        break;
    }

    if (shouldSetErrors) {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  // Focus on first error field with smooth scroll
  const focusFirstError = (stepErrors: Record<string, string>) => {
    const errorFields = Object.keys(stepErrors);
    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0] as keyof typeof fieldRefs;
      const fieldRef = fieldRefs[firstErrorField];
      
      if (fieldRef && fieldRef.current) {
        // Smooth scroll to the field
        fieldRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        // Focus with a slight delay to ensure scroll completes
        setTimeout(() => {
          if (fieldRef.current) {
            if ('focus' in fieldRef.current) {
              (fieldRef.current as HTMLInputElement).focus();
            }
            // Add a subtle shake animation
            fieldRef.current.classList.add('animate-pulse');
            setTimeout(() => {
              if (fieldRef.current) {
                fieldRef.current.classList.remove('animate-pulse');
              }
            }, 1000);
          }
        }, 300);
      }
    }
  };

  const nextStep = () => {
    const isValid = validateStep(currentStep);
    
    if (!isValid) {
      // Find the current step's errors and focus on first error
      const stepErrors: Record<string, string> = {};
      
      // Get step-specific errors
      switch (currentStep) {
        case 1:
          if (!formData.title.trim()) stepErrors.title = 'Title is required';
          if (!formData.description.trim()) stepErrors.description = 'Description is required';
          if (!formData.category) stepErrors.category = 'Category is required';
          break;
        case 2:
          if (!formData.date) stepErrors.date = 'Date is required';
          if (!formData.startTime) stepErrors.startTime = 'Start time is required';
          if (!formData.endTime) stepErrors.endTime = 'End time is required';
          if (!formData.location.trim()) stepErrors.location = 'Location is required';
          break;
        case 3:
          if (formData.maxAttendees < 1) stepErrors.maxAttendees = 'Must allow at least 1 attendee';
          if (!formData.contact.trim()) stepErrors.contact = 'Contact email is required';
          break;
      }
      
      focusFirstError(stepErrors);
      return;
    }

    // If going to the review step (step 6), validate all required fields
    if (currentStep === 5) {
      if (validateAllRequiredFields()) {
        setCurrentStep(prev => Math.min(prev + 1, 6));
      } else {
        // Focus on first missing required field across all steps
        const allErrors = getAllRequiredFieldErrors();
        focusFirstRequiredFieldError(allErrors);
      }
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const addArrayItem = (field: keyof EventFormData, value: string = '') => {
    if (['requirements', 'materials', 'outcomes', 'prerequisites', 'tags'].includes(field)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value]
      }));
    } else if (field === 'agenda') {
      setFormData(prev => ({
        ...prev,
        agenda: [...prev.agenda, { time: '', activity: '', details: '', speaker: '' }]
      }));
    }
  };

  const removeArrayItem = (field: keyof EventFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[] | typeof prev.agenda).filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: keyof EventFormData, index: number, value: string | typeof formData.agenda[0]) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[] | typeof prev.agenda).map((item, i) => i === index ? value : item)
    }));
  };

  // Get all required field errors
  const getAllRequiredFieldErrors = (): Record<string, string> => {
    const allErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) allErrors.title = 'Title is required';
    if (!formData.description.trim()) allErrors.description = 'Description is required';
    if (!formData.category) allErrors.category = 'Category is required';
    if (!formData.date) allErrors.date = 'Date is required';
    if (!formData.startTime) allErrors.startTime = 'Start time is required';
    if (!formData.endTime) allErrors.endTime = 'End time is required';
    if (!formData.location.trim()) allErrors.location = 'Location is required';
    if (!formData.contact.trim()) allErrors.contact = 'Contact email is required';
    if (formData.maxAttendees < 1) allErrors.maxAttendees = 'Must allow at least 1 attendee';
    
    return allErrors;
  };

  // Focus on first required field error with step navigation
  const focusFirstRequiredFieldError = (allErrors: Record<string, string>) => {
    const errorFields = Object.keys(allErrors);
    if (errorFields.length === 0) return;
    
    const firstErrorField = errorFields[0] as keyof typeof fieldRefs;
    
    // Navigate to the appropriate step based on the field
    let targetStep = 1;
    switch (firstErrorField) {
      case 'title':
      case 'description':
      case 'category':
        targetStep = 1;
        break;
      case 'date':
      case 'startTime':
      case 'endTime':
      case 'location':
        targetStep = 2;
        break;
      case 'maxAttendees':
      case 'contact':
        targetStep = 3;
        break;
    }
    
    // Navigate to the step first
    setCurrentStep(targetStep);
    
    // Then focus on the field after a short delay to ensure the step renders
    setTimeout(() => {
      const fieldRef = fieldRefs[firstErrorField];
      if (fieldRef && fieldRef.current) {
        fieldRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        setTimeout(() => {
          if (fieldRef.current && 'focus' in fieldRef.current) {
            (fieldRef.current as HTMLInputElement).focus();
            fieldRef.current.classList.add('animate-pulse');
            setTimeout(() => {
              if (fieldRef.current) {
                fieldRef.current.classList.remove('animate-pulse');
              }
            }, 1000);
          }
        }, 300);
      }
    }, 100);
  };

  const validateAllRequiredFields = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    // Additional validations
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }
    if (formData.maxAttendees < 1) newErrors.maxAttendees = 'Must allow at least 1 attendee';
    if (!formData.contact.trim()) newErrors.contact = 'Contact email is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    // Validate all required fields before saving
    if (!validateAllRequiredFields()) {
      alert('Please fill in all required fields before saving the event.');
      return;
    }
    
    setIsSaving(true);
    try {
      // Here you would save to your backend
      console.log('Saving event:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to events page or show success message
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                href="/admin-panel-fcc-2025/events"
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Event'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Progress Sidebar */}
          <div className="w-64 flex-shrink-0 mr-8">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Event Creation Steps</h3>
              
              {/* Required Fields Summary */}
              <div className="mb-6 p-4 rounded-lg bg-gray-50 border">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Required Fields
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { field: 'title', label: 'Event Title', filled: formData.title.trim() },
                    { field: 'description', label: 'Description', filled: formData.description.trim() },
                    { field: 'category', label: 'Category', filled: formData.category },
                    { field: 'date', label: 'Date', filled: formData.date },
                    { field: 'startTime', label: 'Start Time', filled: formData.startTime },
                    { field: 'endTime', label: 'End Time', filled: formData.endTime },
                    { field: 'location', label: 'Location', filled: formData.location.trim() },
                    { field: 'contact', label: 'Contact Email', filled: formData.contact.trim() }
                  ].map((item) => (
                    <div key={item.field} className="flex items-center justify-between">
                      <span className={item.filled ? 'text-gray-600' : 'text-red-600'}>
                        {item.label}
                      </span>
                      <div className={`w-3 h-3 rounded-full ${
                        item.filled ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t">
                  <div className="text-xs text-gray-600">
                    {[formData.title.trim(), formData.description.trim(), formData.category, formData.date, 
                      formData.startTime, formData.endTime, formData.location.trim(), formData.contact.trim()
                    ].filter(Boolean).length} of 8 required fields completed
                  </div>
                </div>
              </div>
              <nav className="space-y-2">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  // Check if step has required fields and if they're filled
                  let hasErrors = false;
                  let requiredFieldsFilled = true;
                  
                  switch (step.id) {
                    case 1:
                      hasErrors = !formData.title.trim() || !formData.description.trim() || !formData.category;
                      break;
                    case 2:
                      hasErrors = !formData.date || !formData.startTime || !formData.endTime || !formData.location.trim();
                      break;
                    case 3:
                      hasErrors = formData.maxAttendees < 1 || !formData.contact.trim();
                      break;
                    case 4:
                    case 5:
                      hasErrors = false; // No required fields in these steps
                      break;
                    case 6:
                      // Review step - check all required fields
                      hasErrors = !formData.title.trim() || !formData.description.trim() || !formData.category || 
                                 !formData.date || !formData.startTime || !formData.endTime || !formData.location.trim() || 
                                 !formData.contact.trim() || formData.maxAttendees < 1;
                      break;
                  }
                  
                  requiredFieldsFilled = !hasErrors;
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-all duration-200 ${
                        isActive 
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-200 shadow-sm' 
                          : isCompleted
                          ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                          : hasErrors && step.id < currentStep
                          ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                          : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                      } ${isActive ? 'transform scale-105' : ''}`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors ${
                        isActive 
                          ? 'bg-blue-500 text-white' 
                          : isCompleted && requiredFieldsFilled
                          ? 'bg-green-500 text-white'
                          : hasErrors && step.id <= currentStep
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isCompleted && requiredFieldsFilled ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : hasErrors && step.id <= currentStep ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{step.title}</div>
                        <div className="text-xs opacity-75">
                          {isCompleted && requiredFieldsFilled
                            ? 'Completed' 
                            : isActive 
                            ? 'Current'
                            : hasErrors && step.id <= currentStep
                            ? 'Missing required fields'
                            : 'Pending'}
                        </div>
                      </div>
                      {hasErrors && step.id <= currentStep && (
                        <div className="flex-shrink-0 ml-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Event Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Title *
                      </label>
                      <input
                        ref={titleRef}
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter event title..."
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <div ref={categoryRef} className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.map((category) => (
                          <button
                            key={category.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                            className={`p-3 rounded-lg border-2 transition-colors ${
                              formData.category === category.value
                                ? 'border-blue-500 bg-blue-50'
                                : errors.category
                                ? 'border-red-500 bg-red-50 hover:border-red-400'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full ${category.color} mx-auto mb-2`}></div>
                            <div className="text-sm font-medium">{category.label}</div>
                          </button>
                        ))}
                      </div>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Short Description *
                      </label>
                      <textarea
                        ref={descriptionRef}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Brief description for event listings..."
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Description
                      </label>
                      <textarea
                        value={formData.fullDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Detailed description with all event information..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <button className="text-blue-600 hover:text-blue-500">
                            Upload an image
                          </button>
                          <p className="text-sm text-gray-500">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Schedule & Location */}
              {currentStep === 2 && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule & Location</h2>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Event Date *
                        </label>
                        <div className="relative">
                          <input
                            ref={dateRef}
                            type="text"
                            value={formData.date ? new Date(formData.date).toLocaleDateString() : ''}
                            onClick={() => setShowCalendar(true)}
                            readOnly
                            className={`w-full p-3 border rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                              errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Select date..."
                          />
                          <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.date && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.date}
                          </p>
                        )}

                        {/* Calendar Modal */}
                        {showCalendar && (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Select Date</h3>
                                <button
                                  onClick={() => setShowCalendar(false)}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </div>

                              <div className="flex items-center justify-between mb-4">
                                <button
                                  onClick={() => navigateCalendar('prev')}
                                  className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                  <ChevronLeft className="h-5 w-5" />
                                </button>
                                <h4 className="text-lg font-semibold">
                                  {monthNames[currentCalendarDate.getMonth()]} {currentCalendarDate.getFullYear()}
                                </h4>
                                <button
                                  onClick={() => navigateCalendar('next')}
                                  className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                  <ChevronRight className="h-5 w-5" />
                                </button>
                              </div>

                              <div className="grid grid-cols-7 gap-1 mb-2">
                                {dayNames.map(day => (
                                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                                    {day}
                                  </div>
                                ))}
                              </div>

                              <div className="grid grid-cols-7 gap-1">
                                {getDaysInMonth(currentCalendarDate).map((day, index) => (
                                  <button
                                    key={index}
                                    onClick={() => day.isCurrentMonth && selectDate(day.date)}
                                    disabled={!day.isCurrentMonth}
                                    className={`p-2 text-sm rounded-lg transition-colors ${
                                      day.isSelected
                                        ? 'bg-blue-500 text-white'
                                        : day.isCurrentMonth
                                        ? 'hover:bg-gray-100 text-gray-900'
                                        : 'text-gray-400 cursor-not-allowed'
                                    } ${day.events > 0 && day.isCurrentMonth ? 'font-semibold' : ''}`}
                                  >
                                    {day.date.getDate()}
                                    {day.events > 0 && day.isCurrentMonth && (
                                      <div className="w-1 h-1 bg-red-500 rounded-full mx-auto mt-1"></div>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Registration Deadline
                        </label>
                        <input
                          type="date"
                          value={formData.registrationDeadline}
                          onChange={(e) => setFormData(prev => ({ ...prev, registrationDeadline: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Time *
                        </label>
                        <input
                          ref={startTimeRef}
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.startTime ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {errors.startTime && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.startTime}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Time *
                        </label>
                        <input
                          ref={endTimeRef}
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.endTime ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {errors.endTime && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.endTime}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        ref={locationRef}
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Venue name..."
                      />
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Address
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        rows={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Complete address with directions..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Registration */}
              {currentStep === 3 && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Registration Details</h2>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Attendees *
                        </label>
                        <input
                          ref={maxAttendeesRef}
                          type="number"
                          value={formData.maxAttendees}
                          onChange={(e) => setFormData(prev => ({ ...prev, maxAttendees: parseInt(e.target.value) || 0 }))}
                          min="1"
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.maxAttendees ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {errors.maxAttendees && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.maxAttendees}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Registration Fee
                        </label>
                        <div className="flex">
                          <select
                            value={formData.currency}
                            onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                            className="w-20 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="KES">KES</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                          </select>
                          <input
                            type="number"
                            value={formData.registrationFee}
                            onChange={(e) => setFormData(prev => ({ ...prev, registrationFee: parseFloat(e.target.value) || 0 }))}
                            min="0"
                            step="0.01"
                            className="flex-1 p-3 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0.00"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Leave as 0 for free events</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Email *
                        </label>
                        <input
                          ref={contactRef}
                          type="email"
                          value={formData.contact}
                          onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.contact ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="contact@example.com"
                        />
                        {errors.contact && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.contact}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+254 xxx xxx xxx"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organizer Name
                        </label>
                        <input
                          type="text"
                          value={formData.organizer}
                          onChange={(e) => setFormData(prev => ({ ...prev, organizer: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Organization or person name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Event Website
                        </label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Registration Options</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.allowWaitlist}
                            onChange={(e) => setFormData(prev => ({ ...prev, allowWaitlist: e.target.checked }))}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">Allow waitlist when event is full</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.sendReminders}
                            onChange={(e) => setFormData(prev => ({ ...prev, sendReminders: e.target.checked }))}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">Send reminder emails to registered attendees</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.collectFeedback}
                            onChange={(e) => setFormData(prev => ({ ...prev, collectFeedback: e.target.checked }))}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">Collect feedback after the event</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.recordAttendance}
                            onChange={(e) => setFormData(prev => ({ ...prev, recordAttendance: e.target.checked }))}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">Record attendance during the event</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Content */}
              {currentStep === 4 && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Content & Schedule</h2>
                  
                  <div className="space-y-8">
                    {/* Event Agenda */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Event Agenda</h3>
                        <button
                          onClick={() => addArrayItem('agenda')}
                          className="text-blue-600 hover:text-blue-700 flex items-center"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Item
                        </button>
                      </div>
                      <div className="space-y-3">
                        {formData.agenda.map((item, index) => (
                          <div key={index} className="grid grid-cols-12 gap-3 items-start p-4 bg-gray-50 rounded-lg">
                            <div className="col-span-2">
                              <input
                                type="time"
                                value={item.time}
                                onChange={(e) => updateArrayItem('agenda', index, { ...item, time: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div className="col-span-3">
                              <input
                                type="text"
                                value={item.activity}
                                onChange={(e) => updateArrayItem('agenda', index, { ...item, activity: e.target.value })}
                                placeholder="Activity"
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div className="col-span-4">
                              <input
                                type="text"
                                value={item.details}
                                onChange={(e) => updateArrayItem('agenda', index, { ...item, details: e.target.value })}
                                placeholder="Details"
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div className="col-span-2">
                              <input
                                type="text"
                                value={item.speaker || ''}
                                onChange={(e) => updateArrayItem('agenda', index, { ...item, speaker: e.target.value })}
                                placeholder="Speaker"
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div className="col-span-1">
                              <button
                                onClick={() => removeArrayItem('agenda', index)}
                                className="text-red-600 hover:text-red-700 p-1"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">What to Bring</h3>
                        <button
                          onClick={() => addArrayItem('requirements')}
                          className="text-blue-600 hover:text-blue-700 flex items-center"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Item
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.requirements.map((requirement, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={requirement}
                              onChange={(e) => updateArrayItem('requirements', index, e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded"
                              placeholder="Enter requirement..."
                            />
                            <button
                              onClick={() => removeArrayItem('requirements', index)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Materials Provided */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Materials Provided</h3>
                        <button
                          onClick={() => addArrayItem('materials')}
                          className="text-blue-600 hover:text-blue-700 flex items-center"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Item
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.materials.map((material, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={material}
                              onChange={(e) => updateArrayItem('materials', index, e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded"
                              placeholder="Enter material..."
                            />
                            <button
                              onClick={() => removeArrayItem('materials', index)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expected Outcomes */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Expected Outcomes</h3>
                        <button
                          onClick={() => addArrayItem('outcomes')}
                          className="text-blue-600 hover:text-blue-700 flex items-center"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Item
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={outcome}
                              onChange={(e) => updateArrayItem('outcomes', index, e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded"
                              placeholder="Enter expected outcome..."
                            />
                            <button
                              onClick={() => removeArrayItem('outcomes', index)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prerequisites */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Prerequisites</h3>
                        <button
                          onClick={() => addArrayItem('prerequisites')}
                          className="text-blue-600 hover:text-blue-700 flex items-center"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Item
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.prerequisites.map((prerequisite, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={prerequisite}
                              onChange={(e) => updateArrayItem('prerequisites', index, e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded"
                              placeholder="Enter prerequisite..."
                            />
                            <button
                              onClick={() => removeArrayItem('prerequisites', index)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Settings */}
              {currentStep === 5 && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Settings</h2>
                  
                  <div className="space-y-8">
                    {/* Visibility Settings */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Visibility</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="visibility"
                            checked={formData.isPublic}
                            onChange={() => setFormData(prev => ({ ...prev, isPublic: true }))}
                            className="border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            <strong>Public</strong> - Anyone can see and register for this event
                          </span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="visibility"
                            checked={!formData.isPublic}
                            onChange={() => setFormData(prev => ({ ...prev, isPublic: false }))}
                            className="border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            <strong>Private</strong> - Only people with the link can access this event
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
                        <button
                          onClick={() => addArrayItem('tags')}
                          className="text-blue-600 hover:text-blue-700 flex items-center"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Tag
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {formData.tags.map((tag, index) => (
                          <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                            <button
                              onClick={() => removeArrayItem('tags', index)}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Add a tag..."
                          className="flex-1 p-2 border border-gray-300 rounded"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.target as HTMLInputElement;
                              if (input.value.trim()) {
                                addArrayItem('tags', input.value.trim());
                                input.value = '';
                              }
                            }
                          }}
                        />
                        <button
                          onClick={(e) => {
                            const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                            if (input.value.trim()) {
                              addArrayItem('tags', input.value.trim());
                              input.value = '';
                            }
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Certificate Template */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate</h3>
                      <div className="space-y-3">
                        <select
                          value={formData.certificateTemplate}
                          onChange={(e) => setFormData(prev => ({ ...prev, certificateTemplate: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">No certificate</option>
                          <option value="attendance">Certificate of Attendance</option>
                          <option value="completion">Certificate of Completion</option>
                          <option value="participation">Certificate of Participation</option>
                          <option value="achievement">Certificate of Achievement</option>
                        </select>
                        <p className="text-sm text-gray-500">
                          Select a certificate template to automatically generate certificates for attendees
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {currentStep === 6 && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Event Details</h2>
                  
                  {/* Missing Required Fields Warning */}
                  {(!formData.title.trim() || !formData.date || !formData.startTime || !formData.endTime || !formData.location.trim() || !formData.description.trim() || !formData.category || !formData.contact.trim()) && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                        <h3 className="text-lg font-semibold text-red-900">Missing Required Fields</h3>
                      </div>
                      <p className="text-red-700 mt-2">
                        Please complete all required fields marked with (*) before creating the event.
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">Title: *</span>
                          <p className={`font-medium ${!formData.title.trim() ? 'text-red-600' : ''}`}>
                            {formData.title || 'Missing - Required'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Category: *</span>
                          <p className={`font-medium ${!formData.category ? 'text-red-600' : ''}`}>
                            {categories.find(c => c.value === formData.category)?.label || 'Missing - Required'}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-sm text-gray-600">Description: *</span>
                          <p className={`font-medium ${!formData.description.trim() ? 'text-red-600' : ''}`}>
                            {formData.description || 'Missing - Required'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Schedule & Location */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule & Location</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">Date: *</span>
                          <p className={`font-medium ${!formData.date ? 'text-red-600' : ''}`}>
                            {formData.date ? new Date(formData.date).toLocaleDateString() : 'Missing - Required'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Time: *</span>
                          <p className={`font-medium ${!formData.startTime || !formData.endTime ? 'text-red-600' : ''}`}>
                            {formData.startTime && formData.endTime ? `${formData.startTime} - ${formData.endTime}` : 'Missing - Required'}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-sm text-gray-600">Location: *</span>
                          <p className={`font-medium ${!formData.location.trim() ? 'text-red-600' : ''}`}>
                            {formData.location || 'Missing - Required'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Registration */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">Max Attendees:</span>
                          <p className="font-medium">{formData.maxAttendees}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Registration Fee:</span>
                          <p className="font-medium">
                            {formData.registrationFee > 0 ? `${formData.currency} ${formData.registrationFee}` : 'Free'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Contact:</span>
                          <p className="font-medium">{formData.contact}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Organizer:</span>
                          <p className="font-medium">{formData.organizer}</p>
                        </div>
                      </div>
                    </div>

                    {/* Event Content Summary */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Summary</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-600">Agenda Items:</span>
                          <p className="font-medium">{formData.agenda.filter(item => item.activity).length} items</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Requirements:</span>
                          <p className="font-medium">{formData.requirements.length} items</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Materials:</span>
                          <p className="font-medium">{formData.materials.length} items</p>
                        </div>
                      </div>
                    </div>

                    {/* Final Actions */}
                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Ready to Create Event?</h3>
                          <p className="text-sm text-gray-600">
                            Review all information above and click &quot;Create Event&quot; when ready.
                          </p>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setPreviewMode(true)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </button>
                          <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {isSaving ? 'Creating...' : 'Create Event'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="px-8 py-6 bg-gray-50 border-t flex justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep === 6}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === 6 ? 'Complete' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
