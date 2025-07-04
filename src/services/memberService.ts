import connectDB from '@/lib/mongodb';
import { Member } from '@/models/Member';
import { MembershipApplication } from '@/models/MembershipApplication';
import { MembershipAction } from '@/models/MembershipAction';
import { Committee } from '@/models/Committee';
import { Event } from '@/models/Event';
import { Donation } from '@/models/Donation';
import { 
  MembershipStatus,
  MembershipType,
  MembershipCategory,
  ApplicationStatus,
  ActionType 
} from '@/types';

interface CommitteeServed {
  committee: string;
  position?: string;
  startDate: Date;
  endDate?: Date;
}

interface CommitteeMember {
  member: string;
  position: string;
  joinDate: Date;
  endDate?: Date;
  isActive: boolean;
}

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
  membershipType?: MembershipType;
  membershipCategory?: MembershipCategory;
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
  // Additional fields for comprehensive member management
  nationalId?: string;
  nationality?: string;
  maritalStatus?: string;
  previousExperience?: string;
  references?: Array<{
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  }>;
  communicationPreferences?: {
    email: boolean;
    sms: boolean;
    phone: boolean;
    mail: boolean;
  };
}

export interface MemberFilters {
  status?: MembershipStatus;
  membershipType?: MembershipType;
  membershipCategory?: MembershipCategory;
  search?: string;
  committee?: string;
  hasOutstandingFees?: boolean;
  joinDateFrom?: Date;
  joinDateTo?: Date;
}

export interface MembershipApplicationData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    phoneCountryCode?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other';
    nationalId?: string;
    nationality?: string;
    maritalStatus?: string;
    occupation?: string;
    workExperience?: string;
    education?: string;
  };
  address: {
    street?: string;
    city?: string;
    county?: string;
    country?: string;
  };
  membershipInfo: {
    membershipType: MembershipType;
    membershipCategory: MembershipCategory;
    skills?: string[];
    interests?: string[];
    previousExperience?: string;
    reasonForJoining?: string;
  };
  references: Array<{
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  }>;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    phoneCountryCode?: string;
  };
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    phone: boolean;
    mail: boolean;
  };
}

export interface StatusUpdateData {
  status: MembershipStatus;
  substatus?: string;
  reason?: string;
  adminId: string;
  adminName: string;
  effectiveDate?: Date;
  notes?: string;
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
    if (filters.membershipCategory) {
      query.membershipCategory = filters.membershipCategory;
    }
    if (filters.committee) {
      query['committees.committee'] = filters.committee;
    }
    if (filters.hasOutstandingFees !== undefined) {
      query['financial.hasOutstandingFees'] = filters.hasOutstandingFees;
    }
    if (filters.joinDateFrom || filters.joinDateTo) {
      const joinDateFilter: Record<string, unknown> = {};
      if (filters.joinDateFrom) {
        joinDateFilter.$gte = filters.joinDateFrom;
      }
      if (filters.joinDateTo) {
        joinDateFilter.$lte = filters.joinDateTo;
      }
      query.joinDate = joinDateFilter;
    }
    if (filters.search) {
      query.$or = [
        { firstName: { $regex: filters.search, $options: 'i' } },
        { lastName: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } },
        { membershipNumber: { $regex: filters.search, $options: 'i' } }
      ];
    }

    const members = await Member.find(query)
      .select('-__v')
      .populate('committees.committee', 'name description')
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
    
    const member = await Member.findById(id)
      .select('-__v')
      .populate('committees.committee', 'name description')
      .populate('auditLog.admin', 'name email');
    
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
          suspended: {
            $sum: { $cond: [{ $eq: ['$status', 'suspended'] }, 1, 0] }
          },
          expelled: {
            $sum: { $cond: [{ $eq: ['$status', 'expelled'] }, 1, 0] }
          },
          resigned: {
            $sum: { $cond: [{ $eq: ['$status', 'resigned'] }, 1, 0] }
          },
          ordinary: {
            $sum: { $cond: [{ $eq: ['$membershipType', 'ordinary'] }, 1, 0] }
          },
          patron: {
            $sum: { $cond: [{ $eq: ['$membershipType', 'patron'] }, 1, 0] }
          },
          honorary: {
            $sum: { $cond: [{ $eq: ['$membershipType', 'honorary'] }, 1, 0] }
          },
          corporate: {
            $sum: { $cond: [{ $eq: ['$membershipType', 'corporate'] }, 1, 0] }
          },
          student: {
            $sum: { $cond: [{ $eq: ['$membershipType', 'student'] }, 1, 0] }
          },
          withOutstandingFees: {
            $sum: { $cond: [{ $eq: ['$financial.hasOutstandingFees', true] }, 1, 0] }
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
        suspended: 0,
        expelled: 0,
        resigned: 0,
        ordinary: 0,
        patron: 0,
        honorary: 0,
        corporate: 0,
        student: 0,
        withOutstandingFees: 0
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

  // === MEMBERSHIP STATUS MANAGEMENT ===
  
  static async updateMemberStatus(memberId: string, statusUpdate: StatusUpdateData) {
    await connectDB();
    
    try {
      const member = await Member.findById(memberId);
      if (!member) {
        return {
          success: false,
          error: 'Member not found',
          message: 'No member found with this ID'
        };
      }

      // Update status using the member method
      await member.updateStatus(
        statusUpdate.status,
        statusUpdate.substatus,
        statusUpdate.reason,
        statusUpdate.adminId,
        statusUpdate.adminName,
        statusUpdate.effectiveDate,
        statusUpdate.notes
      );

      // Create a membership action record
      await MembershipAction.create({
        member: memberId,
        actionType: statusUpdate.status === 'active' ? 'activation' : 
                   statusUpdate.status === 'suspended' ? 'suspension' :
                   statusUpdate.status === 'expelled' ? 'expulsion' :
                   statusUpdate.status === 'resigned' ? 'resignation' : 'status_change',
        description: `Status changed to ${statusUpdate.status}${statusUpdate.substatus ? ` (${statusUpdate.substatus})` : ''}`,
        reason: statusUpdate.reason,
        performedBy: {
          admin: statusUpdate.adminId,
          name: statusUpdate.adminName
        },
        effectiveDate: statusUpdate.effectiveDate || new Date(),
        notes: statusUpdate.notes
      });

      return {
        success: true,
        data: member,
        message: 'Member status updated successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  static async getMemberByMembershipNumber(membershipNumber: string) {
    await connectDB();
    
    const member = await Member.findOne({ membershipNumber })
      .select('-__v')
      .populate('committees.committee', 'name description');
    
    if (!member) {
      return {
        success: false,
        error: 'Member not found',
        message: 'No member found with this membership number'
      };
    }

    return {
      success: true,
      data: member
    };
  }

  static async addMemberToCommittee(memberId: string, committeeId: string, role: string, adminId: string, adminName: string) {
    await connectDB();
    
    try {
      const member = await Member.findById(memberId);
      if (!member) {
        return {
          success: false,
          error: 'Member not found',
          message: 'No member found with this ID'
        };
      }

      const committee = await Committee.findById(committeeId);
      if (!committee) {
        return {
          success: false,
          error: 'Committee not found',
          message: 'No committee found with this ID'
        };
      }

      // Check if member is already in the committee
      const existingMembership = member.committeesServed?.find((c: CommitteeServed) => c.committee === committeeId);
      if (existingMembership) {
        return {
          success: false,
          error: 'Already a member',
          message: 'Member is already part of this committee'
        };
      }

      // Add to member's committees
      if (!member.committeesServed) {
        member.committeesServed = [];
      }
      member.committeesServed.push({
        committee: committeeId,
        position: role,
        startDate: new Date()
      });

      // Add to committee's members
      committee.members.push({
        member: memberId,
        position: role as 'chairperson' | 'vice-chairperson' | 'secretary' | 'treasurer' | 'member' | 'observer',
        joinDate: new Date(),
        isActive: true
      });

      await member.save();
      await committee.save();

      // Create membership action
      await MembershipAction.create({
        member: memberId,
        actionType: 'committee_assignment',
        description: `Added to committee: ${committee.name} as ${role}`,
        performedBy: {
          admin: adminId,
          name: adminName
        },
        effectiveDate: new Date(),
        metadata: {
          committee: committeeId,
          role: role
        }
      });

      return {
        success: true,
        data: member,
        message: 'Member added to committee successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  static async removeMemberFromCommittee(memberId: string, committeeId: string, adminId: string, adminName: string) {
    await connectDB();
    
    try {
      const member = await Member.findById(memberId);
      if (!member) {
        return {
          success: false,
          error: 'Member not found',
          message: 'No member found with this ID'
        };
      }

      const committee = await Committee.findById(committeeId);
      if (!committee) {
        return {
          success: false,
          error: 'Committee not found',
          message: 'No committee found with this ID'
        };
      }

      // Remove from member's committees
      if (member.committeesServed) {
        member.committeesServed = member.committeesServed.filter((c: CommitteeServed) => c.committee !== committeeId);
      }

      // Remove from committee's members
      committee.members = committee.members.filter((m: CommitteeMember) => m.member.toString() !== memberId);

      await member.save();
      await committee.save();

      // Create membership action
      await MembershipAction.create({
        member: memberId,
        actionType: 'committee_removal',
        description: `Removed from committee: ${committee.name}`,
        performedBy: {
          admin: adminId,
          name: adminName
        },
        effectiveDate: new Date(),
        metadata: {
          committee: committeeId
        }
      });

      return {
        success: true,
        data: member,
        message: 'Member removed from committee successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  // === MEMBERSHIP APPLICATION MANAGEMENT ===
  
  static async submitMembershipApplication(applicationData: MembershipApplicationData) {
    await connectDB();
    
    try {
      // Check if application already exists for this email
      const existingApplication = await MembershipApplication.findOne({
        'personalInfo.email': applicationData.personalInfo.email,
        status: { $in: ['pending', 'under_review', 'approved'] }
      });

      if (existingApplication) {
        return {
          success: false,
          error: 'Application exists',
          message: 'An active application already exists for this email'
        };
      }

      // Check if member already exists
      const existingMember = await Member.findOne({
        email: applicationData.personalInfo.email
      });

      if (existingMember) {
        return {
          success: false,
          error: 'Member exists',
          message: 'A member with this email already exists'
        };
      }

      const application = new MembershipApplication({
        ...applicationData,
        status: 'pending',
        submissionDate: new Date()
      });

      await application.save();

      return {
        success: true,
        data: application,
        message: 'Membership application submitted successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  static async getMembershipApplications(page = 1, limit = 20, status?: ApplicationStatus) {
    await connectDB();
    
    const skip = (page - 1) * limit;
    const query = status ? { status } : {};

    const applications = await MembershipApplication.find(query)
      .select('-__v')
      .populate('review.reviewedBy', 'name email')
      .sort({ submissionDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await MembershipApplication.countDocuments(query);

    return {
      success: true,
      data: {
        applications,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    };
  }

  static async getMembershipApplicationById(id: string) {
    await connectDB();
    
    const application = await MembershipApplication.findById(id)
      .select('-__v')
      .populate('review.reviewedBy', 'name email');
    
    if (!application) {
      return {
        success: false,
        error: 'Application not found',
        message: 'No membership application found with this ID'
      };
    }

    return {
      success: true,
      data: application
    };
  }

  static async reviewMembershipApplication(
    applicationId: string,
    reviewData: {
      status: ApplicationStatus;
      comments?: string;
      interviewRequired?: boolean;
      interviewDate?: Date;
      paymentRequired?: boolean;
      paymentAmount?: number;
      paymentDueDate?: Date;
      adminId: string;
      adminName: string;
    }
  ) {
    await connectDB();
    
    try {
      const application = await MembershipApplication.findById(applicationId);
      if (!application) {
        return {
          success: false,
          error: 'Application not found',
          message: 'No membership application found with this ID'
        };
      }

      // Update application status and review
      application.status = reviewData.status;
      application.review = {
        reviewedBy: reviewData.adminId,
        reviewDate: new Date(),
        comments: reviewData.comments,
        decision: reviewData.status === 'approved' ? 'approved' : 
                 reviewData.status === 'rejected' ? 'rejected' : 'pending'
      };

      if (reviewData.interviewRequired) {
        application.interview = {
          required: true,
          scheduled: !!reviewData.interviewDate,
          date: reviewData.interviewDate
        };
      }

      if (reviewData.paymentRequired) {
        application.payment = {
          required: true,
          amount: reviewData.paymentAmount || 0,
          dueDate: reviewData.paymentDueDate,
          status: 'pending'
        };
      }

      await application.save();

      return {
        success: true,
        data: application,
        message: 'Application reviewed successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  static async approveMembershipApplication(applicationId: string, adminId: string, adminName: string) {
    await connectDB();
    
    try {
      const application = await MembershipApplication.findById(applicationId);
      if (!application) {
        return {
          success: false,
          error: 'Application not found',
          message: 'No membership application found with this ID'
        };
      }

      if (application.status !== 'approved') {
        return {
          success: false,
          error: 'Application not approved',
          message: 'Application must be approved before converting to member'
        };
      }

      // Check if member already exists
      const existingMember = await Member.findOne({
        email: application.personalInfo.email
      });

      if (existingMember) {
        return {
          success: false,
          error: 'Member exists',
          message: 'A member with this email already exists'
        };
      }

      // Create new member from application
      const memberData = {
        ...application.personalInfo,
        address: application.address,
        membershipType: application.membershipInfo.membershipType,
        membershipCategory: application.membershipInfo.membershipCategory,
        skills: application.membershipInfo.skills,
        interests: application.membershipInfo.interests,
        emergencyContact: application.emergencyContact,
        communicationPreferences: application.communicationPreferences,
        references: application.references,
        previousExperience: application.membershipInfo.previousExperience,
        status: 'active' as MembershipStatus,
        joinDate: new Date(),
        admin: {
          approvedBy: adminId,
          approvedDate: new Date(),
          approvedByName: adminName
        }
      };

      const member = new Member(memberData);
      await member.save();

      // Update application status
      application.status = 'converted';
      application.convertedToMember = member._id;
      application.conversionDate = new Date();
      await application.save();

      // Create membership action
      await MembershipAction.create({
        member: member._id,
        actionType: 'membership_approval',
        description: 'Membership approved and member created from application',
        performedBy: {
          admin: adminId,
          name: adminName
        },
        effectiveDate: new Date(),
        metadata: {
          applicationId: applicationId
        }
      });

      return {
        success: true,
        data: member,
        message: 'Membership application converted to member successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  // === MEMBERSHIP ACTION TRACKING ===
  
  static async getMemberActions(memberId: string, page = 1, limit = 20) {
    await connectDB();
    
    const skip = (page - 1) * limit;
    
    const actions = await MembershipAction.find({ member: memberId })
      .select('-__v')
      .populate('performedBy.admin', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await MembershipAction.countDocuments({ member: memberId });

    return {
      success: true,
      data: {
        actions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    };
  }

  static async createMembershipAction(
    memberId: string,
    actionType: ActionType,
    description: string,
    adminId: string,
    adminName: string,
    effectiveDate?: Date,
    notes?: string,
    metadata?: Record<string, unknown>
  ) {
    await connectDB();
    
    try {
      const action = new MembershipAction({
        member: memberId,
        actionType,
        description,
        performedBy: {
          admin: adminId,
          name: adminName
        },
        effectiveDate: effectiveDate || new Date(),
        notes,
        metadata
      });

      await action.save();

      return {
        success: true,
        data: action,
        message: 'Membership action recorded successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  // === COMMITTEE MANAGEMENT ===
  
  static async getCommittees(page = 1, limit = 20) {
    await connectDB();
    
    const skip = (page - 1) * limit;
    
    const committees = await Committee.find({ status: 'active' })
      .select('-__v')
      .populate('members.member', 'firstName lastName email membershipNumber')
      .populate('chair', 'firstName lastName email')
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Committee.countDocuments({ status: 'active' });

    return {
      success: true,
      data: {
        committees,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    };
  }

  static async createCommittee(committeeData: {
    name: string;
    description?: string;
    purpose?: string;
    responsibilities?: string[];
    chairId?: string;
    maxMembers?: number;
    adminId: string;
    adminName: string;
  }) {
    await connectDB();
    
    try {
      const committee = new Committee({
        name: committeeData.name,
        description: committeeData.description,
        purpose: committeeData.purpose,
        responsibilities: committeeData.responsibilities,
        chair: committeeData.chairId,
        maxMembers: committeeData.maxMembers,
        status: 'active',
        createdBy: {
          admin: committeeData.adminId,
          name: committeeData.adminName
        }
      });

      await committee.save();

      return {
        success: true,
        data: committee,
        message: 'Committee created successfully'
      };
    } catch (error) {
      throw error;
    }
  }

}
