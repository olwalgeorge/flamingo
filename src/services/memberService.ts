import connectDB from '@/lib/mongodb';
import { Member } from '@/models/Member';
import { Event } from '@/models/Event';
import { Donation } from '@/models/Donation';

export interface MemberData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCountryCode?: string;
  address?: {
    street?: string;
    city?: string;
    county?: string;
    country?: string;
  };
  membershipType?: 'ordinary' | 'patron' | 'honorary';
  skills?: string[];
  interests?: string[];
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
    phoneCountryCode?: string;
  };
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  occupation?: string;
  workExperience?: string;
  education?: string;
}

export interface MemberFilters {
  status?: 'active' | 'inactive' | 'suspended';
  membershipType?: 'ordinary' | 'patron' | 'honorary';
  search?: string;
}

export class MemberService {
  static async createMember(memberData: MemberData) {
    await connectDB();
    
    try {
      const member = new Member(memberData);
      await member.save();
      return {
        success: true,
        data: member,
        message: 'Member created successfully'
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        return {
          success: false,
          error: 'Email already exists',
          message: 'A member with this email already exists'
        };
      }
      throw error;
    }
  }

  static async getAllMembers(page = 1, limit = 20, filters: MemberFilters = {}) {
    await connectDB();
    
    const skip = (page - 1) * limit;
    const query: Record<string, unknown> = {};
    
    // Apply filters
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.membershipType) {
      query.membershipType = filters.membershipType;
    }
    if (filters.search) {
      query.$or = [
        { firstName: { $regex: filters.search, $options: 'i' } },
        { lastName: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } }
      ];
    }

    const members = await Member.find(query)
      .select('-__v')
      .sort({ joinDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Member.countDocuments(query);

    return {
      success: true,
      data: {
        members,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    };
  }

  static async getMemberById(id: string) {
    await connectDB();
    
    const member = await Member.findById(id).select('-__v');
    
    if (!member) {
      return {
        success: false,
        error: 'Member not found',
        message: 'No member found with this ID'
      };
    }

    return {
      success: true,
      data: member
    };
  }

  static async updateMember(id: string, updateData: Partial<MemberData>) {
    await connectDB();
    
    try {
      const member = await Member.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).select('-__v');

      if (!member) {
        return {
          success: false,
          error: 'Member not found',
          message: 'No member found with this ID'
        };
      }

      return {
        success: true,
        data: member,
        message: 'Member updated successfully'
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        return {
          success: false,
          error: 'Email already exists',
          message: 'Another member already has this email'
        };
      }
      throw error;
    }
  }

  static async deleteMember(id: string) {
    await connectDB();
    
    const member = await Member.findByIdAndDelete(id);
    
    if (!member) {
      return {
        success: false,
        error: 'Member not found',
        message: 'No member found with this ID'
      };
    }

    return {
      success: true,
      message: 'Member deleted successfully'
    };
  }

  static async getMemberStats() {
    await connectDB();
    
    const stats = await Member.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          inactive: {
            $sum: { $cond: [{ $eq: ['$status', 'inactive'] }, 1, 0] }
          },
          ordinary: {
            $sum: { $cond: [{ $eq: ['$membershipType', 'ordinary'] }, 1, 0] }
          },
          patron: {
            $sum: { $cond: [{ $eq: ['$membershipType', 'patron'] }, 1, 0] }
          },
          honorary: {
            $sum: { $cond: [{ $eq: ['$membershipType', 'honorary'] }, 1, 0] }
          }
        }
      }
    ]);

    return {
      success: true,
      data: stats[0] || {
        total: 0,
        active: 0,
        inactive: 0,
        ordinary: 0,
        patron: 0,
        honorary: 0
      }
    };
  }

  static async getMemberActivity(memberId: string) {
    await connectDB();
    
    // Get member's events
    const events = await Event.find({
      'registeredMembers.member': memberId
    }).select('title date status').sort({ date: -1 }).limit(10);

    // Get member's donations
    const donations = await Donation.find({
      'donor.member': memberId
    }).select('amount currency purpose createdAt').sort({ createdAt: -1 }).limit(10);

    return {
      success: true,
      data: {
        events,
        donations
      }
    };
  }
}
