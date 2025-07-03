'use client';

import React from 'react';
import { Mail, Phone, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { 
  CONTACT_INFO, 
  getMainContactPhone, 
  getMainContactEmail,
  getFormattedBusinessHours,
  isOfficeOpen
} from '@/data/contactInfo';

interface ContactCardProps {
  variant?: 'default' | 'compact' | 'detailed';
  showLeadership?: boolean;
  showBusinessHours?: boolean;
  showDepartments?: boolean;
  className?: string;
}

export default function ContactCard({ 
  variant = 'default',
  showLeadership = false,
  showBusinessHours = true,
  showDepartments = false,
  className = ''
}: ContactCardProps) {
  const businessHours = getFormattedBusinessHours();
  const officeOpen = isOfficeOpen();

  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact {CONTACT_INFO.organization.acronym}</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
            <a 
              href={`tel:${getMainContactPhone()}`}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              {getMainContactPhone()}
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-blue-600 flex-shrink-0" />
            <a 
              href={`mailto:${getMainContactEmail()}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {getMainContactEmail()}
            </a>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">
              {CONTACT_INFO.office.address}, {CONTACT_INFO.office.city}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            officeOpen 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {officeOpen ? 'Office Open' : 'Office Closed'}
          </div>
        </div>

        <div className="space-y-6">
          {/* Primary Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Primary Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Main Phone</p>
                  <a 
                    href={`tel:${getMainContactPhone()}`}
                    className="text-gray-900 font-medium hover:text-green-600 transition-colors"
                  >
                    {getMainContactPhone()}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">General Email</p>
                  <a 
                    href={`mailto:${getMainContactEmail()}`}
                    className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                  >
                    {getMainContactEmail()}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Office Location</h4>
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Visit Us</p>
                <div className="text-gray-900">
                  <p>{CONTACT_INFO.office.address}</p>
                  <p>{CONTACT_INFO.office.postalAddress}</p>
                  <p>{CONTACT_INFO.office.city}, {CONTACT_INFO.office.county}</p>
                  <p>{CONTACT_INFO.office.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Areas */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Service Areas</h4>
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">We serve the following areas:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {CONTACT_INFO.operatingAreas.map((area, index) => (
                    <span key={index} className="text-gray-700 text-sm">
                      • {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          {showBusinessHours && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Office Hours</h4>
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {businessHours.map(({ day, hours }) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-gray-700 font-medium">{day}:</span>
                        <span className={`text-sm ${hours === 'Closed' ? 'text-red-600' : 'text-gray-600'}`}>
                          {hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Department Emails */}
          {showDepartments && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Department Contacts</h4>
              <div className="space-y-4">
                {Object.entries(CONTACT_INFO.departments).map(([dept, info]) => (
                  <div key={dept} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 capitalize">{dept}</h5>
                        <p className="text-sm text-gray-600 mb-2">{info.description}</p>
                      </div>
                      <Mail className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    </div>
                    <div className="mb-3">
                      <a 
                        href={`mailto:${info.email}`}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                      >
                        {info.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Responsible for:</p>
                      <div className="flex flex-wrap gap-1">
                        {info.responsibleFor.map((item, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leadership */}
          {showLeadership && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Leadership Team</h4>
              <div className="space-y-3">
                {CONTACT_INFO.leadership.map((leader, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-900">{leader.name}</h5>
                        <p className="text-sm text-gray-600">{leader.position}</p>
                        <p className="text-xs text-gray-500 mt-1">{leader.role}</p>
                      </div>
                      <div className="text-right space-y-1">
                        {leader.phone && (
                          <a 
                            href={`tel:${leader.phone}`}
                            className="block text-sm text-green-600 hover:text-green-800"
                          >
                            {leader.phone}
                          </a>
                        )}
                        {leader.email && (
                          <a 
                            href={`mailto:${leader.email}`}
                            className="block text-sm text-blue-600 hover:text-blue-800"
                          >
                            {leader.email}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media */}
          {CONTACT_INFO.socialMedia && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {Object.entries(CONTACT_INFO.socialMedia).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm capitalize">{platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
