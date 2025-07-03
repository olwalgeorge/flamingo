'use client';

import React from 'react';
import { Mail, Users, CheckCircle } from 'lucide-react';
import { CONTACT_INFO, getDepartmentInfo } from '@/data/contactInfo';

interface DepartmentContactProps {
  department: keyof typeof CONTACT_INFO.departments;
  variant?: 'card' | 'inline' | 'detailed';
  showDescription?: boolean;
  showResponsibilities?: boolean;
  className?: string;
}

export default function DepartmentContactComponent({ 
  department,
  variant = 'card',
  showDescription = true,
  showResponsibilities = true,
  className = ''
}: DepartmentContactProps) {
  const info = getDepartmentInfo(department);

  if (variant === 'inline') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Mail className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-600 capitalize">{department}:</span>
        <a 
          href={`mailto:${info.email}`}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {info.email}
        </a>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 capitalize mb-2">{department} Department</h3>
            {showDescription && (
              <p className="text-gray-600 mb-4">{info.description}</p>
            )}
            
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Contact Email:</span>
              </div>
              <a 
                href={`mailto:${info.email}`}
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                {info.email}
              </a>
            </div>

            {showResponsibilities && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Services & Responsibilities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {info.responsibleFor.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <div className={`bg-gray-50 p-4 rounded-lg ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h5 className="font-medium text-gray-900 capitalize">{department}</h5>
          {showDescription && (
            <p className="text-sm text-gray-600 mb-2">{info.description}</p>
          )}
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
      
      {showResponsibilities && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Handles:</p>
          <div className="flex flex-wrap gap-1">
            {info.responsibleFor.slice(0, 3).map((item, index) => (
              <span 
                key={index} 
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {item}
              </span>
            ))}
            {info.responsibleFor.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{info.responsibleFor.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Convenience component for all departments
interface DepartmentContactsProps {
  variant?: 'card' | 'inline' | 'detailed';
  showDescription?: boolean;
  showResponsibilities?: boolean;
  departments?: (keyof typeof CONTACT_INFO.departments)[];
  className?: string;
}

export function DepartmentContacts({ 
  variant = 'card',
  showDescription = true,
  showResponsibilities = true,
  departments,
  className = ''
}: DepartmentContactsProps) {
  const deptList = departments || Object.keys(CONTACT_INFO.departments) as (keyof typeof CONTACT_INFO.departments)[];
  
  if (variant === 'detailed') {
    return (
      <div className={className}>
        {deptList.map((dept) => (
          <DepartmentContactComponent
            key={dept}
            department={dept}
            variant={variant}
            showDescription={showDescription}
            showResponsibilities={showResponsibilities}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div className={`space-y-4 ${className}`}>
      {deptList.map((dept) => (
        <DepartmentContactComponent
          key={dept}
          department={dept}
          variant={variant}
          showDescription={showDescription}
          showResponsibilities={showResponsibilities}
        />
      ))}
    </div>
  );
}
