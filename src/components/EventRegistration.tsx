'use client';

import { useState } from 'react';
import { UserPlus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface EventRegistrationProps {
  eventId: string;
  eventTitle: string;
  currentAttendees: number;
  maxAttendees: number;
  onRegistrationUpdate?: (newCount: number) => void;
}

export default function EventRegistration({ 
  eventTitle, 
  currentAttendees, 
  maxAttendees,
  onRegistrationUpdate 
}: Omit<EventRegistrationProps, 'eventId'>) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    dietaryRequirements: '',
    emergencyContact: ''
  });

  const handleRegistration = async () => {
    setIsRegistering(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsRegistered(true);
    setIsRegistering(false);
    setShowForm(false);
    
    // Update parent component with new attendee count
    if (onRegistrationUpdate) {
      onRegistrationUpdate(currentAttendees + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  if (isRegistered) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center">
          <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-green-900">Registration Confirmed!</h3>
            <p className="text-green-700">You&apos;re successfully registered for {eventTitle}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-green-600">
            A confirmation email has been sent to {registrationData.email}
          </p>
        </div>
      </div>
    );
  }

  const isFull = currentAttendees >= maxAttendees;

  if (isFull) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertCircle className="h-6 w-6 text-yellow-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-900">Event Full</h3>
            <p className="text-yellow-700">This event has reached maximum capacity</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg cursor-not-allowed">
          Join Waiting List
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!showForm ? (
        <button 
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Register for Event
        </button>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Registration</h3>
          
          <form onSubmit={(e) => { e.preventDefault(); handleRegistration(); }} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={registrationData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={registrationData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={registrationData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={registrationData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Emergency contact number"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Requirements / Special Needs
              </label>
              <textarea
                name="dietaryRequirements"
                rows={3}
                value={registrationData.dietaryRequirements}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please specify any dietary requirements or accessibility needs..."
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 mr-3"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the event terms and conditions and understand that I will receive event updates via email. 
                  I consent to my contact information being used for event-related communications.
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isRegistering}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center disabled:opacity-50"
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="text-center text-sm text-gray-600">
        {currentAttendees}/{maxAttendees} spots filled
      </div>
    </div>
  );
}
