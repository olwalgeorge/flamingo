// Universal contact information for FLAMINGO CHAP CHAP CBO
// Centralized data source used across all pages and components

export interface ContactPerson {
  name: string;
  position: string;
  phone?: string;
  email?: string;
  role: string;
}

export interface OfficeInfo {
  address: string;
  postalAddress: string;
  city: string;
  county: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ContactHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface DepartmentContact {
  email: string;
  description: string;
  responsibleFor: string[];
}

export interface ContactInfo {
  organization: {
    name: string;
    fullName: string;
    acronym: string;
  };
  primaryContact: {
    phone: string;
    email: string;
    alternativePhone?: string;
  };
  departments: {
    [key: string]: DepartmentContact;
  };
  leadership: ContactPerson[];
  office: OfficeInfo;
  operatingAreas: string[];
  businessHours: ContactHours;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  emergencyContact?: {
    phone: string;
    description: string;
  };
}

// Centralized contact information
export const CONTACT_INFO: ContactInfo = {
  organization: {
    name: 'FLAMINGO CHAP CHAP CBO',
    fullName: 'FLAMINGO Community-Based Organization',
    acronym: 'FCC CBO'
  },
  primaryContact: {
    phone: '+254722113087',
    email: 'info@flamingochapchap.org',
    alternativePhone: '+254700123456'
  },
  departments: {
    general: {
      email: 'info@flamingochapchap.org',
      description: 'General Inquiries & Information',
      responsibleFor: ['General questions', 'Organization information', 'Initial contact', 'Program overview']
    },
    events: {
      email: 'events@flamingochapchap.org',
      description: 'Events & Activities Coordination',
      responsibleFor: ['Event registration', 'Activity schedules', 'Community meetings', 'Workshop bookings']
    },
    volunteer: {
      email: 'volunteer@flamingochapchap.org',
      description: 'Volunteer Opportunities & Management',
      responsibleFor: ['Volunteer applications', 'Training schedules', 'Assignment coordination', 'Volunteer support']
    },
    membership: {
      email: 'membership@flamingochapchap.org',
      description: 'Membership Services & Support',
      responsibleFor: ['Membership applications', 'Member benefits', 'Renewals', 'Member directory']
    },
    finance: {
      email: 'finance@flamingochapchap.org',
      description: 'Financial Services & Donations',
      responsibleFor: ['Donation processing', 'Financial reports', 'Budget inquiries', 'Funding opportunities']
    }
  },
  leadership: [
    {
      name: 'Samuel Weswa Khaukha',
      position: 'Chairman',
      phone: '+254722113087',
      email: 'chairman@flamingochapchap.org',
      role: 'Leading environmental conservation and community development vision'
    },
    {
      name: 'George Omondi Olwal',
      position: 'General Secretary',
      phone: '+254711234567',
      email: 'secretary@flamingochapchap.org',
      role: 'Managing records, correspondence, and program communication'
    },
    {
      name: 'Len Chelimo Koskei',
      position: 'Treasurer',
      phone: '+254733456789',
      email: 'treasurer@flamingochapchap.org',
      role: 'Financial management, transparency, and accountability'
    }
  ],
  office: {
    address: 'Flamingo Unit, Kondele Ward',
    postalAddress: 'P.O Box 2340-40100',
    city: 'Kisumu',
    county: 'Kisumu County',
    country: 'Kenya',
    coordinates: {
      lat: -0.1022,
      lng: 34.7617
    }
  },
  operatingAreas: [
    'Kondele Ward',
    'Kisumu Central',
    'River Kibos Watershed',
    'River Auji Basin'
  ],
  businessHours: {
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 5:00 PM',
    thursday: '9:00 AM - 5:00 PM',
    friday: '9:00 AM - 5:00 PM',
    saturday: '10:00 AM - 2:00 PM',
    sunday: 'Closed'
  },
  socialMedia: {
    facebook: 'https://facebook.com/flamingochapchap',
    twitter: 'https://twitter.com/flamingocbo',
    instagram: 'https://instagram.com/flamingochapchap'
  },
  emergencyContact: {
    phone: '+254722113087',
    description: 'For urgent environmental incidents or community emergencies'
  }
};

// Utility functions
export const getFormattedAddress = (): string => {
  const { office } = CONTACT_INFO;
  return `${office.address}\n${office.postalAddress}\n${office.city}, ${office.county}\n${office.country}`;
};

export const getMainContactPhone = (): string => {
  return CONTACT_INFO.primaryContact.phone;
};

export const getMainContactEmail = (): string => {
  return CONTACT_INFO.primaryContact.email;
};

export const getDepartmentEmail = (department: keyof typeof CONTACT_INFO.departments): string => {
  return CONTACT_INFO.departments[department].email;
};

export const getDepartmentInfo = (department: keyof typeof CONTACT_INFO.departments): DepartmentContact => {
  return CONTACT_INFO.departments[department];
};

export const getLeadershipByPosition = (position: string): ContactPerson | undefined => {
  return CONTACT_INFO.leadership.find(leader => 
    leader.position.toLowerCase().includes(position.toLowerCase())
  );
};

export const getBusinessHoursForDay = (day: keyof ContactHours): string => {
  return CONTACT_INFO.businessHours[day];
};

export const getFormattedBusinessHours = (): { day: string; hours: string }[] => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  return days.map(day => ({
    day: day.charAt(0).toUpperCase() + day.slice(1),
    hours: CONTACT_INFO.businessHours[day]
  }));
};

export const isOfficeOpen = (): boolean => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hour = now.getHours();
  
  // Map day number to our day names
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
  const todayHours = CONTACT_INFO.businessHours[dayNames[day]];
  
  if (todayHours === 'Closed') return false;
  
  // Parse hours (format: "9:00 AM - 5:00 PM")
  const hoursMatch = todayHours.match(/(\d+):(\d+)\s*(AM|PM)\s*-\s*(\d+):(\d+)\s*(AM|PM)/);
  if (!hoursMatch) return false;
  
  const startHour = parseInt(hoursMatch[1]) + (hoursMatch[3] === 'PM' && hoursMatch[1] !== '12' ? 12 : 0);
  const endHour = parseInt(hoursMatch[4]) + (hoursMatch[6] === 'PM' && hoursMatch[4] !== '12' ? 12 : 0);
  
  return hour >= startHour && hour < endHour;
};
