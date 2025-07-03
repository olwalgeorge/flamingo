import { formatPhoneNumber } from '@/utils/countryCodes';

// Volunteer application types and data

export interface VolunteerPosition {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  timeCommitment: string;
  duration: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  training: string;
  contact: string;
  applicationDeadline?: string;
  isActive: boolean;
}

export interface VolunteerApplication {
  id: string;
  positionId: string;
  positionTitle: string;
  applicantInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    dateOfBirth: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  availability: {
    preferredDays: string[];
    preferredTimes: string[];
    weeklyHours: string;
    startDate: string;
    duration: string;
  };
  experience: {
    previousVolunteer: boolean;
    volunteerExperience: string;
    relevantSkills: string[];
    workExperience: string;
    education: string;
  };
  motivation: {
    whyVolunteer: string;
    whatMotivates: string;
    goals: string;
    hearAboutUs: string;
  };
  additionalInfo: {
    backgroundCheck: boolean;
    transportation: boolean;
    physicalLimitations: string;
    specialAccommodations: string;
    additionalComments: string;
  };
  references: Array<{
    name: string;
    relationship: string;
    email: string;
    phone: string;
  }>;
  applicationDate: Date;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'waitlist';
}

// Form data interface
export interface VolunteerApplicationFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  dateOfBirth: string;
  
  // Address
  street: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Emergency Contact
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  emergencyPhoneCountryCode: string;
  
  // Availability
  preferredDays: string[];
  preferredTimes: string[];
  weeklyHours: string;
  startDate: string;
  duration: string;
  
  // Experience
  previousVolunteer: string;
  volunteerExperience?: string;
  relevantSkills?: string[];
  workExperience?: string;
  education?: string;
  
  // Motivation
  whyVolunteer: string;
  whatMotivates: string;
  goals?: string;
  hearAboutUs: string;
  
  // Additional Info
  backgroundCheck: string;
  transportation: string;
  physicalLimitations?: string;
  specialAccommodations?: string;
  additionalComments?: string;
  
  // References
  reference1Name: string;
  reference1Relationship: string;
  reference1Email: string;
  reference1Phone: string;
  reference2Name?: string;
  reference2Relationship?: string;
  reference2Email?: string;
  reference2Phone?: string;
}

export const volunteerPositions: VolunteerPosition[] = [
  {
    id: 'env-001',
    title: 'Environmental Conservation Coordinator',
    description: 'Lead environmental conservation efforts including river clean-ups, tree planting, and community education about sustainability practices.',
    category: 'Environmental',
    location: 'Various outdoor locations in Kisumu County',
    timeCommitment: 'Regular',
    duration: '6-10 hours/week',
    requirements: [
      'Passion for environmental conservation',
      'Leadership experience preferred',
      'Ability to work outdoors in various weather conditions',
      'Physical fitness for outdoor activities',
      'Strong communication skills'
    ],
    responsibilities: [
      'Organize and lead environmental clean-up activities',
      'Coordinate tree planting initiatives',
      'Educate community members on conservation practices',
      'Maintain records of environmental activities',
      'Collaborate with local environmental organizations'
    ],
    skills: ['Leadership', 'Environmental knowledge', 'Project management', 'Community engagement'],
    training: 'Environmental conservation training provided. First aid certification preferred.',
    contact: 'environment@fcccbo.org',
    applicationDeadline: '2025-08-15',
    isActive: true
  },
  {
    id: 'edu-001',
    title: 'Youth Education Mentor',
    description: 'Mentor young people in educational activities, life skills development, and career guidance within our community programs.',
    category: 'Education',
    location: 'Community Center & Local Schools',
    timeCommitment: 'Regular',
    duration: '4-6 hours/week',
    requirements: [
      'Background check required',
      'Experience working with youth',
      'Excellent communication skills',
      'Patience and empathy',
      'High school diploma minimum'
    ],
    responsibilities: [
      'Provide one-on-one mentoring to youth',
      'Assist with homework and educational activities',
      'Organize educational workshops',
      'Support career exploration activities',
      'Maintain confidential mentoring records'
    ],
    skills: ['Teaching', 'Youth development', 'Communication', 'Counseling basics'],
    training: 'Youth mentoring certification and child protection training required.',
    contact: 'education@fcccbo.org',
    applicationDeadline: '2025-07-30',
    isActive: true
  },
  {
    id: 'evt-001',
    title: 'Community Event Organizer',
    description: 'Plan, coordinate, and execute community events from small workshops to large community gatherings and fundraising events.',
    category: 'Events',
    location: 'Various community venues',
    timeCommitment: 'Flexible',
    duration: '5-15 hours/week (varies by event)',
    requirements: [
      'Event planning experience preferred',
      'Strong organizational skills',
      'Ability to work under pressure',
      'Team leadership capabilities',
      'Reliable transportation'
    ],
    responsibilities: [
      'Plan and coordinate community events',
      'Manage event logistics and setup',
      'Coordinate with vendors and volunteers',
      'Ensure event safety and compliance',
      'Evaluate event success and gather feedback'
    ],
    skills: ['Event planning', 'Project management', 'Leadership', 'Problem-solving'],
    training: 'Event management training and safety protocols provided.',
    contact: 'events@fcccbo.org',
    isActive: true
  },
  {
    id: 'soc-001',
    title: 'Senior Community Companion',
    description: 'Provide companionship and support to elderly community members through regular visits, activities, and assistance with daily tasks.',
    category: 'Social Services',
    location: 'Senior homes & private residences',
    timeCommitment: 'Regular',
    duration: '3-5 hours/week',
    requirements: [
      'Background check required',
      'Compassionate and patient nature',
      'Good listening skills',
      'Reliability and punctuality',
      'Cultural sensitivity'
    ],
    responsibilities: [
      'Provide regular companionship visits',
      'Assist with light daily activities',
      'Organize recreational activities',
      'Provide transportation for appointments when needed',
      'Report any concerns to program coordinator'
    ],
    skills: ['Interpersonal communication', 'Empathy', 'Cultural awareness', 'Basic care knowledge'],
    training: 'Senior care basics and cultural competency training provided.',
    contact: 'seniors@fcccbo.org',
    applicationDeadline: '2025-08-01',
    isActive: true
  },
  {
    id: 'hlth-001',
    title: 'Community Health Educator',
    description: 'Promote health awareness and education in the community through workshops, outreach programs, and health screening support.',
    category: 'Health',
    location: 'Community centers, health clinics, outreach locations',
    timeCommitment: 'Flexible',
    duration: '4-8 hours/week',
    requirements: [
      'Health education background preferred',
      'Strong presentation skills',
      'Cultural sensitivity and awareness',
      'Ability to work with diverse populations',
      'Reliable and professional demeanor'
    ],
    responsibilities: [
      'Conduct health education workshops',
      'Support community health screenings',
      'Develop health education materials',
      'Maintain health program records',
      'Collaborate with healthcare professionals'
    ],
    skills: ['Health education', 'Public speaking', 'Community outreach', 'Program development'],
    training: 'Health education certification and community health training provided.',
    contact: 'health@fcccbo.org',
    isActive: true
  },
  {
    id: 'fin-001',
    title: 'Financial Literacy Instructor',
    description: 'Teach financial literacy and money management skills to community members through workshops and one-on-one counseling.',
    category: 'Financial Education',
    location: 'Community Center & Banking Partner Locations',
    timeCommitment: 'Regular',
    duration: '3-6 hours/week',
    requirements: [
      'Financial background or relevant experience',
      'Teaching or training experience',
      'Strong mathematical skills',
      'Professional communication abilities',
      'Understanding of local financial systems'
    ],
    responsibilities: [
      'Conduct financial literacy workshops',
      'Provide one-on-one financial counseling',
      'Develop curriculum and materials',
      'Track participant progress',
      'Partner with local financial institutions'
    ],
    skills: ['Financial knowledge', 'Teaching', 'Counseling', 'Curriculum development'],
    training: 'Financial literacy certification and adult education training provided.',
    contact: 'finance@fcccbo.org',
    applicationDeadline: '2025-07-25',
    isActive: true
  },
  {
    id: 'tech-001',
    title: 'Digital Literacy Coordinator',
    description: 'Help community members develop digital skills through computer training, internet safety education, and technology support.',
    category: 'Technology',
    location: 'Computer lab & community locations',
    timeCommitment: 'Flexible',
    duration: '4-7 hours/week',
    requirements: [
      'Strong computer and internet skills',
      'Teaching or tutoring experience',
      'Patience with technology beginners',
      'Problem-solving abilities',
      'Good communication skills'
    ],
    responsibilities: [
      'Teach basic computer skills',
      'Provide internet safety education',
      'Support technology troubleshooting',
      'Develop digital learning materials',
      'Maintain computer lab equipment'
    ],
    skills: ['Technology proficiency', 'Teaching', 'Technical support', 'Digital literacy'],
    training: 'Digital literacy instructor certification and technology training provided.',
    contact: 'technology@fcccbo.org',
    isActive: true
  }
];

export const applicationFormFields = {
  personalInfo: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true }
  ],
  address: [
    { name: 'street', label: 'Street Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State/County', type: 'text', required: true },
    { name: 'zipCode', label: 'Postal Code', type: 'text', required: true }
  ],
  availability: [
    { 
      name: 'preferredDays', 
      label: 'Preferred Days', 
      type: 'checkbox-group', 
      options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true 
    },
    { 
      name: 'preferredTimes', 
      label: 'Preferred Times', 
      type: 'checkbox-group', 
      options: ['Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-10PM)', 'Flexible'],
      required: true 
    },
    { 
      name: 'weeklyHours', 
      label: 'Available Hours per Week', 
      type: 'select', 
      options: ['1-3 hours', '4-6 hours', '7-10 hours', '11-15 hours', '15+ hours'],
      required: true 
    },
    { name: 'startDate', label: 'Preferred Start Date', type: 'date', required: true },
    { 
      name: 'duration', 
      label: 'Commitment Duration', 
      type: 'select', 
      options: ['1-3 months', '3-6 months', '6-12 months', '1+ years', 'Ongoing'],
      required: true 
    }
  ],
  emergencyContact: [
    { name: 'emergencyName', label: 'Emergency Contact Name', type: 'text', required: true },
    { 
      name: 'emergencyRelationship', 
      label: 'Relationship', 
      type: 'select', 
      options: ['Spouse', 'Parent', 'Child', 'Sibling', 'Friend', 'Other Family Member', 'Other'],
      required: true 
    },
    { name: 'emergencyPhone', label: 'Emergency Contact Phone', type: 'tel', required: true }
  ],
  experience: [
    { 
      name: 'previousVolunteer', 
      label: 'Have you volunteered before?', 
      type: 'radio', 
      options: ['Yes', 'No'],
      required: true 
    },
    { 
      name: 'volunteerExperience', 
      label: 'Please describe your volunteer experience', 
      type: 'textarea', 
      required: false 
    },
    { 
      name: 'relevantSkills', 
      label: 'Relevant Skills (select all that apply)', 
      type: 'checkbox-group', 
      options: [
        'Leadership', 'Teaching', 'Communication', 'Event Planning', 
        'Technology', 'Healthcare', 'Financial Planning', 'Environmental Conservation',
        'Youth Development', 'Senior Care', 'Project Management', 'Public Speaking',
        'Language Skills', 'Art/Creative', 'Sports/Recreation', 'Other'
      ],
      required: false 
    },
    { name: 'workExperience', label: 'Relevant Work Experience', type: 'textarea', required: false },
    { name: 'education', label: 'Educational Background', type: 'textarea', required: false }
  ],
  motivation: [
    { 
      name: 'whyVolunteer', 
      label: 'Why do you want to volunteer with our organization?', 
      type: 'textarea', 
      required: true 
    },
    { 
      name: 'whatMotivates', 
      label: 'What motivates you to help in the community?', 
      type: 'textarea', 
      required: true 
    },
    { 
      name: 'goals', 
      label: 'What do you hope to achieve through volunteering?', 
      type: 'textarea', 
      required: false 
    },
    { 
      name: 'hearAboutUs', 
      label: 'How did you hear about our organization?', 
      type: 'select', 
      options: [
        'Website', 'Social Media', 'Friend/Family', 'Community Event', 
        'Local News', 'Religious Organization', 'School', 'Other'
      ],
      required: true 
    }
  ],
  additionalInfo: [
    { 
      name: 'backgroundCheck', 
      label: 'Are you willing to undergo a background check if required?', 
      type: 'radio', 
      options: ['Yes', 'No'],
      required: true 
    },
    { 
      name: 'transportation', 
      label: 'Do you have reliable transportation?', 
      type: 'radio', 
      options: ['Yes', 'No'],
      required: true 
    },
    { 
      name: 'physicalLimitations', 
      label: 'Do you have any physical limitations we should be aware of?', 
      type: 'textarea', 
      required: false 
    },
    { 
      name: 'specialAccommodations', 
      label: 'Do you require any special accommodations?', 
      type: 'textarea', 
      required: false 
    },
    { 
      name: 'additionalComments', 
      label: 'Additional Comments or Questions', 
      type: 'textarea', 
      required: false 
    }
  ],
  references: [
    { name: 'reference1Name', label: 'Reference 1 - Name', type: 'text', required: true },
    { name: 'reference1Relationship', label: 'Reference 1 - Relationship', type: 'text', required: true },
    { name: 'reference1Email', label: 'Reference 1 - Email', type: 'email', required: true },
    { name: 'reference1Phone', label: 'Reference 1 - Phone', type: 'tel', required: true },
    { name: 'reference2Name', label: 'Reference 2 - Name', type: 'text', required: false },
    { name: 'reference2Relationship', label: 'Reference 2 - Relationship', type: 'text', required: false },
    { name: 'reference2Email', label: 'Reference 2 - Email', type: 'email', required: false },
    { name: 'reference2Phone', label: 'Reference 2 - Phone', type: 'tel', required: false }
  ]
};

export function getVolunteerPositionById(id: string): VolunteerPosition | undefined {
  return volunteerPositions.find(position => position.id === id);
}

export function getActiveVolunteerPositions(): VolunteerPosition[] {
  return volunteerPositions.filter(position => position.isActive);
}

export function getVolunteerPositionsByCategory(category: string): VolunteerPosition[] {
  return volunteerPositions.filter(position => position.category === category && position.isActive);
}

// Utility functions for volunteer application management
export function getVolunteerCategories(): string[] {
  const categories = volunteerPositions.map(position => position.category);
  return [...new Set(categories)].sort();
}

export function validateApplicationData(data: Partial<VolunteerApplication>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate required personal info
  if (!data.applicantInfo?.firstName?.trim()) {
    errors.push('First name is required');
  }
  if (!data.applicantInfo?.lastName?.trim()) {
    errors.push('Last name is required');
  }
  if (!data.applicantInfo?.email?.trim()) {
    errors.push('Email address is required');
  }
  if (!data.applicantInfo?.phone?.trim()) {
    errors.push('Phone number is required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.applicantInfo?.email && !emailRegex.test(data.applicantInfo.email)) {
    errors.push('Please enter a valid email address');
  }

  // Validate address
  if (!data.applicantInfo?.address?.street?.trim()) {
    errors.push('Street address is required');
  }
  if (!data.applicantInfo?.address?.city?.trim()) {
    errors.push('City is required');
  }

  // Validate availability
  if (!data.availability?.preferredDays?.length) {
    errors.push('Please select at least one preferred day');
  }
  if (!data.availability?.preferredTimes?.length) {
    errors.push('Please select at least one preferred time');
  }

  // Validate motivation
  if (!data.motivation?.whyVolunteer?.trim()) {
    errors.push('Please explain why you want to volunteer');
  }
  if (!data.motivation?.whatMotivates?.trim()) {
    errors.push('Please explain what motivates you');
  }

  // Validate at least one reference
  if (!data.references?.length || !data.references[0]?.name?.trim()) {
    errors.push('At least one reference is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function createVolunteerApplication(
  positionId: string, 
  formData: VolunteerApplicationFormData
): Omit<VolunteerApplication, 'id' | 'applicationDate' | 'status'> {
  const position = getVolunteerPositionById(positionId);
  
  if (!position) {
    throw new Error('Invalid position ID');
  }

  return {
    positionId,
    positionTitle: position.title,
    applicantInfo: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formatPhoneNumber(formData.phone, formData.phoneCountryCode || '+254'),
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      },
      dateOfBirth: formData.dateOfBirth,
      emergencyContact: {
        name: formData.emergencyName,
        relationship: formData.emergencyRelationship,
        phone: formatPhoneNumber(formData.emergencyPhone, formData.emergencyPhoneCountryCode || '+254')
      }
    },
    availability: {
      preferredDays: formData.preferredDays || [],
      preferredTimes: formData.preferredTimes || [],
      weeklyHours: formData.weeklyHours,
      startDate: formData.startDate,
      duration: formData.duration
    },
    experience: {
      previousVolunteer: formData.previousVolunteer === 'Yes',
      volunteerExperience: formData.volunteerExperience || '',
      relevantSkills: formData.relevantSkills || [],
      workExperience: formData.workExperience || '',
      education: formData.education || ''
    },
    motivation: {
      whyVolunteer: formData.whyVolunteer,
      whatMotivates: formData.whatMotivates,
      goals: formData.goals || '',
      hearAboutUs: formData.hearAboutUs
    },
    additionalInfo: {
      backgroundCheck: formData.backgroundCheck === 'Yes',
      transportation: formData.transportation === 'Yes',
      physicalLimitations: formData.physicalLimitations || '',
      specialAccommodations: formData.specialAccommodations || '',
      additionalComments: formData.additionalComments || ''
    },
    references: [
      {
        name: formData.reference1Name,
        relationship: formData.reference1Relationship,
        email: formData.reference1Email,
        phone: formData.reference1Phone
      },
      ...(formData.reference2Name ? [{
        name: formData.reference2Name,
        relationship: formData.reference2Relationship || '',
        email: formData.reference2Email || '',
        phone: formData.reference2Phone || ''
      }] : [])
    ].filter(ref => ref.name && ref.name.trim())
  };
}

export function getApplicationStatusColor(status: VolunteerApplication['status']): string {
  switch (status) {
    case 'approved': return 'text-green-600 bg-green-100';
    case 'rejected': return 'text-red-600 bg-red-100';
    case 'reviewing': return 'text-blue-600 bg-blue-100';
    case 'waitlist': return 'text-yellow-600 bg-yellow-100';
    default: return 'text-gray-600 bg-gray-100';
  }
}

export function getPositionsWithDeadlines(): VolunteerPosition[] {
  const today = new Date();
  return volunteerPositions.filter(position => {
    if (!position.applicationDeadline || !position.isActive) return false;
    const deadline = new Date(position.applicationDeadline);
    return deadline >= today;
  }).sort((a, b) => {
    const dateA = new Date(a.applicationDeadline!);
    const dateB = new Date(b.applicationDeadline!);
    return dateA.getTime() - dateB.getTime();
  });
}
