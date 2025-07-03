// Fundraiser management service for event-specific donations

export interface FundraiserDonation {
  id: string;
  eventId: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  message?: string;
  isAnonymous: boolean;
  createdAt: Date;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface FundraiserStats {
  eventId: string;
  totalRaised: number;
  donationCount: number;
  averageDonation: number;
  lastDonationDate?: Date;
  topDonation: number;
}

// Mock storage - in a real app, this would be a database
const donations: FundraiserDonation[] = [
  {
    id: 'don_1',
    eventId: '1',
    donorName: 'Sarah Johnson',
    donorEmail: 'sarah.j@email.com',
    amount: 250,
    message: 'Happy to support this amazing cause!',
    isAnonymous: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    paymentStatus: 'completed'
  },
  {
    id: 'don_2',
    eventId: '1',
    donorName: 'Anonymous',
    donorEmail: 'anon@email.com',
    amount: 100,
    message: 'Keep up the great work!',
    isAnonymous: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    paymentStatus: 'completed'
  },
  {
    id: 'don_3',
    eventId: '1',
    donorName: 'Mike Chen',
    donorEmail: 'mike.chen@email.com',
    amount: 500,
    message: 'This initiative will make a real difference.',
    isAnonymous: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    paymentStatus: 'completed'
  },
  {
    id: 'don_4',
    eventId: '3',
    donorName: 'Community Group',
    donorEmail: 'group@community.org',
    amount: 300,
    message: 'From our local community group with love.',
    isAnonymous: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    paymentStatus: 'completed'
  },
  {
    id: 'don_5',
    eventId: '3',
    donorName: 'Jane Smith',
    donorEmail: 'jane.smith@email.com',
    amount: 150,
    message: 'Every little bit helps!',
    isAnonymous: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    paymentStatus: 'completed'
  }
];

export function getDonationsForEvent(eventId: string): FundraiserDonation[] {
  return donations
    .filter(donation => donation.eventId === eventId && donation.paymentStatus === 'completed')
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getRecentDonations(eventId: string, limit: number = 10): FundraiserDonation[] {
  return getDonationsForEvent(eventId).slice(0, limit);
}

export function getFundraiserStats(eventId: string): FundraiserStats {
  const eventDonations = getDonationsForEvent(eventId);
  
  if (eventDonations.length === 0) {
    return {
      eventId,
      totalRaised: 0,
      donationCount: 0,
      averageDonation: 0,
      topDonation: 0
    };
  }

  const totalRaised = eventDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const amounts = eventDonations.map(d => d.amount);
  
  return {
    eventId,
    totalRaised,
    donationCount: eventDonations.length,
    averageDonation: Math.round(totalRaised / eventDonations.length),
    lastDonationDate: eventDonations[0]?.createdAt,
    topDonation: Math.max(...amounts)
  };
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}

export async function createDonation(donation: Omit<FundraiserDonation, 'id' | 'createdAt' | 'paymentStatus'>): Promise<FundraiserDonation> {
  const newDonation: FundraiserDonation = {
    ...donation,
    id: `don_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
    paymentStatus: 'pending'
  };

  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate payment success (in real app, this would integrate with payment processor)
  newDonation.paymentStatus = 'completed';
  donations.push(newDonation);
  
  return newDonation;
}

export function getTopDonors(eventId: string, limit: number = 5): Array<{
  name: string;
  amount: number;
  isAnonymous: boolean;
}> {
  const eventDonations = getDonationsForEvent(eventId);
  
  // Group donations by donor (for non-anonymous donors)
  const donorTotals = new Map<string, { name: string; amount: number; isAnonymous: boolean }>();
  
  eventDonations.forEach(donation => {
    const key = donation.isAnonymous ? `anon_${donation.id}` : donation.donorEmail;
    const displayName = donation.isAnonymous ? 'Anonymous' : donation.donorName;
    
    if (donorTotals.has(key)) {
      donorTotals.get(key)!.amount += donation.amount;
    } else {
      donorTotals.set(key, {
        name: displayName,
        amount: donation.amount,
        isAnonymous: donation.isAnonymous
      });
    }
  });
  
  return Array.from(donorTotals.values())
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}
