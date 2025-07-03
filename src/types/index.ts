export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  avatar: string;
  skills: string[];
  bio: string;
}

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
  approvalStatus: 'draft' | 'pending' | 'approved' | 'rejected';
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
