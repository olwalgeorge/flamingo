// React hook for accessing CBO contact information
'use client';

import { useMemo } from 'react';
import { 
  CONTACT_INFO, 
  getMainContactPhone, 
  getMainContactEmail, 
  getFormattedBusinessHours,
  isOfficeOpen,
  getLeadershipByPosition,
  getDepartmentEmail,
  getDepartmentInfo
} from '@/data/contactInfo';

export function useContactInfo() {
  const contactInfo = useMemo(() => CONTACT_INFO, []);
  
  const helpers = useMemo(() => ({
    getMainPhone: () => getMainContactPhone(),
    getMainEmail: () => getMainContactEmail(),
    getBusinessHours: () => getFormattedBusinessHours(),
    isOpen: () => isOfficeOpen(),
    getLeader: (position: string) => getLeadershipByPosition(position),
    getDepartmentEmail: (department: keyof typeof CONTACT_INFO.departments) => getDepartmentEmail(department),
    getDepartmentInfo: (department: keyof typeof CONTACT_INFO.departments) => getDepartmentInfo(department),
    getFormattedAddress: () => {
      const { office } = CONTACT_INFO;
      return `${office.address}, ${office.postalAddress}, ${office.city}, ${office.county}, ${office.country}`;
    },
    getShortAddress: () => {
      const { office } = CONTACT_INFO;
      return `${office.city}, ${office.county}`;
    }
  }), []);

  return {
    contactInfo,
    ...helpers
  };
}

// Specific hooks for common use cases
export function useMainContact() {
  return {
    phone: getMainContactPhone(),
    email: getMainContactEmail()
  };
}

export function useOfficeStatus() {
  return {
    isOpen: isOfficeOpen(),
    businessHours: getFormattedBusinessHours()
  };
}

export function useLeadership() {
  return CONTACT_INFO.leadership;
}

export function useDepartments() {
  return CONTACT_INFO.departments;
}

export function useDepartmentInfo(department: keyof typeof CONTACT_INFO.departments) {
  return CONTACT_INFO.departments[department];
}

export function useOfficeLocation() {
  const { office } = CONTACT_INFO;
  return {
    ...office,
    formattedAddress: `${office.address}, ${office.postalAddress}, ${office.city}, ${office.county}, ${office.country}`,
    shortAddress: `${office.city}, ${office.county}`
  };
}
