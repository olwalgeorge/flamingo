export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: 'community' | 'volunteer' | 'fundraising' | 'educational' | 'environmental' | 'meeting';
  attendees: number;
  maxAttendees?: number;
  // Financial Management
  hasFinancialTracking?: boolean;
  estimatedCost?: number;
  fundraisingGoal?: number;
  currency?: string;
  financialSummary?: EventFinancialSummary;
  // Financial References
  fundraisingId?: string;
  budgetId?: string;
  expenditureIds?: string[];
}

export interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export interface Donation {
  id: string;
  amount: number;
  donor: string;
  message?: string;
  date: string;
  isAnonymous: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  requirements: string[];
  contact: string;
}

// Chat System Types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  sessionId: string;
}

export interface ChatSession {
  id: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  startTime: Date;
  endTime?: Date;
  messages: ChatMessage[];
  status: 'active' | 'closed' | 'escalated';
  category?: 'general' | 'events' | 'membership' | 'donations' | 'technical';
}

export interface ChatContextData {
  upcomingEvents: Event[];
  memberInfo?: {
    totalMembers: number;
    activeVolunteers: number;
    membershipTypes: {
      type: string;
      description: string;
      rights: string[];
    }[];
  };
  leadership?: {
    name: string;
    position: string;
    role: string;
  }[];
  recentDonations?: {
    id: string;
    amount: number;
    date: Date;
    purpose: string;
  }[];
  organizationInfo: {
    name: string;
    fullName?: string;
    establishedYear?: number;
    registrationStatus?: string;
    mission: string;
    vision?: string;
    coreValues?: {
      value: string;
      description: string;
    }[];
    services: string[];
    focusAreas?: string[];
    achievements?: string[];
    contactInfo: {
      email: string;
      phone: string;
      address: string;
      operatingAreas?: string[];
    };
  };
}

// Financial Management Types
export interface EventFundraising {
  id: string;
  eventId: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'cancelled';
  fundraisingMethods: {
    method: 'online' | 'cash' | 'mobile_money' | 'bank_transfer' | 'sponsorship';
    amount: number;
    percentage: number;
  }[];
  donations: {
    id: string;
    donorName: string;
    amount: number;
    method: string;
    date: Date;
    isAnonymous: boolean;
    message?: string;
  }[];
}

export interface EventBudget {
  id: string;
  eventId: string;
  totalBudget: number;
  currency: string;
  categories: {
    id: string;
    name: string;
    allocatedAmount: number;
    description: string;
    priority: 'high' | 'medium' | 'low';
    items: {
      id: string;
      name: string;
      estimatedCost: number;
      actualCost?: number;
      quantity: number;
      unit: string;
      supplier?: string;
      notes?: string;
    }[];
  }[];
  contingency: {
    percentage: number;
    amount: number;
    purpose: string;
  };
  approvalStatus: 'draft' | 'pending' | 'approved' | 'rejected' | 'amended';
  createdBy: string;
  createdDate: Date;
  approvedBy?: string;
  approvedDate?: Date;
}

export interface EventExpenditure {
  id: string;
  eventId: string;
  budgetCategoryId: string;
  budgetItemId?: string;
  amount: number;
  currency: string;
  description: string;
  date: Date;
  paymentMethod: 'cash' | 'bank_transfer' | 'mobile_money' | 'check' | 'credit_card';
  vendor?: string;
  receiptNumber?: string;
  receiptUrl?: string;
  approvedBy: string;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  tags: string[];
  notes?: string;
}

export interface EventFinancialSummary {
  eventId: string;
  fundraising: {
    targetAmount: number;
    raisedAmount: number;
    completionPercentage: number;
    topDonationMethods: {
      method: string;
      amount: number;
      count: number;
    }[];
  };
  budget: {
    totalBudget: number;
    allocatedAmount: number;
    remainingAmount: number;
    categoryBreakdown: {
      categoryName: string;
      allocated: number;
      spent: number;
      remaining: number;
      utilizationPercentage: number;
    }[];
  };
  expenditure: {
    totalSpent: number;
    pendingPayments: number;
    averageTransactionAmount: number;
    topVendors: {
      vendor: string;
      amount: number;
      transactionCount: number;
    }[];
    monthlySpending: {
      month: string;
      amount: number;
    }[];
  };
  profitLoss: {
    revenue: number;
    expenses: number;
    netProfit: number;
    profitMargin: number;
  };
  variance: {
    budgetVsActual: {
      category: string;
      budgeted: number;
      actual: number;
      variance: number;
      variancePercentage: number;
    }[];
  };
  costPerAttendee: number;
  roi: number;
}

export interface FinancialReport {
  id: string;
  eventId: string;
  reportType: 'summary' | 'detailed' | 'variance' | 'fundraising' | 'expenditure';
  generatedDate: Date;
  generatedBy: string;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  data: EventFinancialSummary;
  insights: {
    key: string;
    value: string;
    trend: 'positive' | 'negative' | 'neutral';
    recommendation?: string;
  }[];
}

// Member Flow Types - Enhanced for Community Organization
export interface Member {
  id: string;
  membershipNumber?: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  
  // Membership Information
  membershipType: 'ordinary' | 'patron' | 'honorary' | 'student' | 'senior' | 'corporate';
  membershipCategory: 'individual' | 'family' | 'corporate' | 'institutional';
  applicationDate: string;
  approvalDate?: string;
  joinDate: string;
  
  // Status and Lifecycle
  status: 'pending' | 'approved' | 'active' | 'inactive' | 'suspended' | 'expelled' | 'resigned' | 'deceased';
  substatus?: 'probation' | 'grace-period' | 'renewal-due' | 'payment-overdue';
  statusReason?: string;
  
  // Personal Information
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  idNumber?: string;
  address?: Address;
  
  // Professional Information
  occupation?: string;
  employer?: string;
  education?: string;
  skills: string[];
  interests: string[];
  
  // Participation
  committees?: string[];
  eventsAttended?: string[];
  volunteerHours?: number;
  
  // Financial
  currentFeeStatus: 'paid' | 'pending' | 'overdue' | 'exempt';
  membershipFees?: MembershipFee[];
  
  // Contact
  emergencyContact: EmergencyContact;
  communicationPreferences: CommunicationPreferences;
  
  // Profile
  avatar: string;
  bio: string;
  profileImage?: string;
  role: string;
  
  // Admin
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street?: string;
  city?: string;
  county?: string;
  country?: string;
  postalCode?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  phoneCountryCode: string;
  email?: string;
}

export interface MembershipFee {
  amount: number;
  currency: string;
  paymentDate: string;
  paymentMethod: string;
  receiptNumber?: string;
  validUntil: string;
}

export interface CommunicationPreferences {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  newsletter: boolean;
  eventUpdates: boolean;
}

// Membership Application Types
export interface MembershipApplication {
  id: string;
  applicationNumber: string;
  applicationDate: string;
  applicantType: 'individual' | 'family' | 'corporate' | 'institutional';
  
  // Applicant Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address: Address;
  
  // Membership Details
  requestedMembershipType: 'ordinary' | 'patron' | 'honorary' | 'student' | 'senior' | 'corporate';
  requestedMembershipCategory: 'individual' | 'family' | 'corporate' | 'institutional';
  reasonForJoining: string;
  howDidYouHear: string;
  
  // Professional Information
  occupation?: string;
  employer?: string;
  education?: string;
  skills: string[];
  interests: string[];
  
  // Application Status
  status: 'submitted' | 'under-review' | 'approved' | 'rejected' | 'withdrawn' | 'expired';
  substatus?: 'awaiting-documents' | 'awaiting-references' | 'awaiting-payment' | 'awaiting-interview';
  
  // Review Process
  reviews: ApplicationReview[];
  finalDecision?: 'approve' | 'reject';
  finalDecisionDate?: string;
  
  // Documents and References
  documents: ApplicationDocument[];
  references: ApplicationReference[];
  
  // Emergency Contact
  emergencyContact: EmergencyContact;
  communicationPreferences: CommunicationPreferences;
  
  // Interview
  interviewScheduled?: string;
  interviewNotes?: string;
  interviewScore?: number;
  
  // Payment
  membershipFeeAmount?: number;
  membershipFeePaid?: boolean;
  membershipFeePaymentDate?: string;
  
  // Conversion
  convertedToMember?: boolean;
  memberId?: string;
  conversionDate?: string;
  
  // Admin
  assignedReviewer?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationReview {
  id: string;
  reviewedBy: string;
  reviewDate: string;
  decision: 'approve' | 'reject' | 'pending' | 'request-more-info';
  comments?: string;
  score?: number;
  criteria?: {
    eligibility: boolean;
    documentation: boolean;
    references: boolean;
    interview: boolean;
    background: boolean;
  };
}

export interface ApplicationDocument {
  id: string;
  type: 'id-copy' | 'photo' | 'certificate' | 'recommendation' | 'other';
  filename: string;
  url: string;
  uploadDate: string;
  verified: boolean;
  verifiedBy?: string;
  verifiedDate?: string;
}

export interface ApplicationReference {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  organization?: string;
  contactedDate?: string;
  response?: 'positive' | 'negative' | 'neutral' | 'no-response';
  notes?: string;
}

// Membership Action Types
export interface MembershipAction {
  id: string;
  member: string;
  actionType: 'approval' | 'suspension' | 'reinstatement' | 'expulsion' | 'resignation' | 'renewal' | 'fee-payment' | 'warning' | 'probation' | 'status-change' | 'other';
  actionDate: string;
  actionBy: string;
  
  // Action Details
  reason: string;
  description?: string;
  previousStatus?: string;
  newStatus?: string;
  
  // Specific Action Details
  suspensionDuration?: number;
  suspensionEndDate?: string;
  probationDuration?: number;
  probationEndDate?: string;
  warningLevel?: 'verbal' | 'written' | 'final';
  feeAmount?: number;
  feeCurrency?: string;
  
  // Status and Appeals
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'expired' | 'appealed';
  canBeAppealed?: boolean;
  appealDeadline?: string;
  appealSubmitted?: boolean;
  appealDecision?: 'upheld' | 'overturned' | 'modified';
  
  // Follow-up
  followUpRequired?: boolean;
  followUpDate?: string;
  followUpCompleted?: boolean;
  
  createdAt: string;
  updatedAt: string;
}

// Committee Types
export interface Committee {
  id: string;
  name: string;
  code: string;
  description: string;
  type: 'standing' | 'ad-hoc' | 'sub-committee' | 'working-group';
  category: 'governance' | 'finance' | 'programs' | 'events' | 'membership' | 'communications' | 'other';
  
  // Structure
  parentCommittee?: string;
  subCommittees?: string[];
  
  // Members
  members: CommitteeMember[];
  maxMembers?: number;
  minMembers?: number;
  quorum?: number;
  
  // Terms and Meetings
  termDuration?: number;
  termStartDate?: string;
  termEndDate?: string;
  meetingFrequency: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'bi-annually' | 'annually' | 'as-needed';
  meetingDay?: string;
  meetingTime?: string;
  meetingVenue?: string;
  nextMeetingDate?: string;
  
  // Meetings
  meetings: CommitteeMeeting[];
  
  // Mandate
  mandate: string;
  responsibilities: string[];
  authority: string[];
  
  // Budget
  annualBudget?: number;
  budgetCurrency?: string;
  allocatedFunds?: number;
  spentFunds?: number;
  
  // Status
  status: 'active' | 'inactive' | 'dissolved' | 'suspended';
  establishedDate: string;
  
  // Performance
  performanceMetrics?: CommitteePerformance;
  
  createdAt: string;
  updatedAt: string;
}

export interface CommitteeMember {
  member: string;
  memberName?: string;
  position: 'chairperson' | 'vice-chairperson' | 'secretary' | 'treasurer' | 'member' | 'observer';
  joinDate: string;
  endDate?: string;
  isActive: boolean;
  responsibilities?: string[];
}

export interface CommitteeMeeting {
  id: string;
  meetingNumber: number;
  meetingDate: string;
  meetingType: 'regular' | 'special' | 'emergency' | 'annual';
  venue: string;
  agenda: string[];
  attendees: MeetingAttendee[];
  decisions: string[];
  actionItems: ActionItem[];
  minutesDocumentUrl?: string;
  nextMeetingDate?: string;
}

export interface MeetingAttendee {
  member: string;
  memberName?: string;
  attended: boolean;
  apologies: boolean;
  role?: string;
}

export interface ActionItem {
  id: string;
  description: string;
  assignedTo: string;
  assignedToName?: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  completedDate?: string;
}

export interface CommitteePerformance {
  meetingsScheduled: number;
  meetingsHeld: number;
  averageAttendance: number;
  decisionsExecuted: number;
  actionItemsCompleted: number;
}

// Type exports for service layer
export type MembershipStatus = 'active' | 'inactive' | 'suspended' | 'expelled' | 'resigned' | 'pending';
export type MembershipType = 'ordinary' | 'patron' | 'honorary' | 'student' | 'senior' | 'corporate';
export type MembershipCategory = 'regular' | 'new' | 'renewal' | 'senior' | 'student' | 'family' | 'corporate' | 'institutional';
export type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'withdrawn' | 'expired' | 'converted';
export type ActionType = 'approval' | 'suspension' | 'reinstatement' | 'expulsion' | 'resignation' | 'renewal' | 'fee_payment' | 'warning' | 'probation' | 'status_change' | 'committee_assignment' | 'committee_removal' | 'membership_approval' | 'activation' | 'other';
export type CommitteeRole = 'chair' | 'vice-chair' | 'secretary' | 'treasurer' | 'member' | 'advisor' | 'observer';
export type CommitteeStatus = 'active' | 'inactive' | 'suspended' | 'dissolved';
export type CommitteeType = 'standing' | 'ad-hoc' | 'sub-committee' | 'working-group';
