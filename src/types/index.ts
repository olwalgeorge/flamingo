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
