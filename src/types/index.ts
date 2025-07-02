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
  category: 'community' | 'volunteer' | 'fundraising' | 'educational';
  attendees: number;
  maxAttendees?: number;
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
  memberInfo?: Member;
  recentDonations?: {
    id: string;
    amount: number;
    date: Date;
    purpose: string;
  }[];
  organizationInfo: {
    name: string;
    mission: string;
    services: string[];
    contactInfo: {
      email: string;
      phone: string;
      address: string;
    };
  };
}
