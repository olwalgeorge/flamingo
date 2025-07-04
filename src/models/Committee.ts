import mongoose from 'mongoose';

// TypeScript interfaces
export interface ICommitteeMember {
  member: mongoose.Types.ObjectId;
  position: 'chairperson' | 'vice-chairperson' | 'secretary' | 'treasurer' | 'member' | 'observer';
  joinDate: Date;
  endDate?: Date;
  isActive: boolean;
  appointedBy?: mongoose.Types.ObjectId;
  appointmentReason?: string;
  responsibilities?: string[];
}

export interface ICommitteeMeeting {
  meetingNumber: number;
  meetingDate: Date;
  meetingType: 'regular' | 'special' | 'emergency' | 'annual';
  venue: string;
  agenda: string[];
  attendees: {
    member: mongoose.Types.ObjectId;
    attended: boolean;
    apologies: boolean;
    role?: string;
  }[];
  decisions: string[];
  actionItems: {
    description: string;
    assignedTo: mongoose.Types.ObjectId;
    dueDate: Date;
    status: 'pending' | 'in-progress' | 'completed' | 'overdue';
    completedDate?: Date;
  }[];
  minutesDocumentUrl?: string;
  nextMeetingDate?: Date;
}

export interface ICommittee extends mongoose.Document {
  name: string;
  code: string;
  description: string;
  type: 'standing' | 'ad-hoc' | 'sub-committee' | 'working-group';
  category: 'governance' | 'finance' | 'programs' | 'events' | 'membership' | 'communications' | 'other';
  
  // Structure
  parentCommittee?: mongoose.Types.ObjectId;
  subCommittees?: mongoose.Types.ObjectId[];
  
  // Members
  members: ICommitteeMember[];
  maxMembers?: number;
  minMembers?: number;
  quorum?: number;
  
  // Terms and Meetings
  termDuration?: number; // in months
  termStartDate?: Date;
  termEndDate?: Date;
  meetingFrequency: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'bi-annually' | 'annually' | 'as-needed';
  meetingDay?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  meetingTime?: string;
  meetingVenue?: string;
  
  // Meetings
  meetings: ICommitteeMeeting[];
  nextMeetingDate?: Date;
  
  // Mandate and Responsibilities
  mandate: string;
  responsibilities: string[];
  authority: string[];
  reportingTo?: mongoose.Types.ObjectId;
  
  // Budget and Resources
  annualBudget?: number;
  budgetCurrency?: string;
  allocatedFunds?: number;
  spentFunds?: number;
  
  // Status
  status: 'active' | 'inactive' | 'dissolved' | 'suspended';
  establishedDate: Date;
  dissolvedDate?: Date;
  dissolvedReason?: string;
  
  // Documentation
  charter?: string;
  documents?: {
    type: string;
    title: string;
    url: string;
    uploadDate: Date;
  }[];
  
  // Performance
  performanceMetrics?: {
    meetingsScheduled: number;
    meetingsHeld: number;
    averageAttendance: number;
    decisionsExecuted: number;
    actionItemsCompleted: number;
  };
  
  // Admin
  createdBy: mongoose.Types.ObjectId;
  lastModifiedBy?: mongoose.Types.ObjectId;
  
  // Methods
  getCurrentChairperson(): ICommitteeMember | null;
  getActiveMembers(): ICommitteeMember[];
  scheduleMeeting(meetingData: Partial<ICommitteeMeeting>): void;
  addMember(memberData: Partial<ICommitteeMember>): void;
  removeMember(memberId: mongoose.Types.ObjectId, reason?: string): void;
  calculateQuorum(): number;
  isQuorumMet(attendeeCount: number): boolean;
}

const committeeSchema = new mongoose.Schema<ICommittee>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['standing', 'ad-hoc', 'sub-committee', 'working-group'],
    required: true,
  },
  category: {
    type: String,
    enum: ['governance', 'finance', 'programs', 'events', 'membership', 'communications', 'other'],
    required: true,
  },
  
  // Structure
  parentCommittee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Committee',
  },
  subCommittees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Committee',
  }],
  
  // Members
  members: [{
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
    position: {
      type: String,
      enum: ['chairperson', 'vice-chairperson', 'secretary', 'treasurer', 'member', 'observer'],
      default: 'member',
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    endDate: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    appointedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    appointmentReason: String,
    responsibilities: [String],
  }],
  maxMembers: Number,
  minMembers: {
    type: Number,
    default: 3,
  },
  quorum: Number,
  
  // Terms and Meetings
  termDuration: Number, // in months
  termStartDate: Date,
  termEndDate: Date,
  meetingFrequency: {
    type: String,
    enum: ['weekly', 'bi-weekly', 'monthly', 'quarterly', 'bi-annually', 'annually', 'as-needed'],
    default: 'monthly',
  },
  meetingDay: {
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  },
  meetingTime: String,
  meetingVenue: String,
  
  // Meetings
  meetings: [{
    meetingNumber: {
      type: Number,
      required: true,
    },
    meetingDate: {
      type: Date,
      required: true,
    },
    meetingType: {
      type: String,
      enum: ['regular', 'special', 'emergency', 'annual'],
      default: 'regular',
    },
    venue: String,
    agenda: [String],
    attendees: [{
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
      attended: {
        type: Boolean,
        default: false,
      },
      apologies: {
        type: Boolean,
        default: false,
      },
      role: String,
    }],
    decisions: [String],
    actionItems: [{
      description: {
        type: String,
        required: true,
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
      },
      dueDate: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'overdue'],
        default: 'pending',
      },
      completedDate: Date,
    }],
    minutesDocumentUrl: String,
    nextMeetingDate: Date,
  }],
  nextMeetingDate: Date,
  
  // Mandate and Responsibilities
  mandate: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: [String],
    required: true,
  },
  authority: [String],
  reportingTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Committee',
  },
  
  // Budget and Resources
  annualBudget: Number,
  budgetCurrency: {
    type: String,
    default: 'KES',
  },
  allocatedFunds: {
    type: Number,
    default: 0,
  },
  spentFunds: {
    type: Number,
    default: 0,
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'dissolved', 'suspended'],
    default: 'active',
  },
  establishedDate: {
    type: Date,
    default: Date.now,
  },
  dissolvedDate: Date,
  dissolvedReason: String,
  
  // Documentation
  charter: String,
  documents: [{
    type: String,
    title: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  }],
  
  // Performance
  performanceMetrics: {
    meetingsScheduled: {
      type: Number,
      default: 0,
    },
    meetingsHeld: {
      type: Number,
      default: 0,
    },
    averageAttendance: {
      type: Number,
      default: 0,
    },
    decisionsExecuted: {
      type: Number,
      default: 0,
    },
    actionItemsCompleted: {
      type: Number,
      default: 0,
    },
  },
  
  // Admin
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
}, {
  timestamps: true,
});

// Instance Methods
committeeSchema.methods.getCurrentChairperson = function(): ICommitteeMember | null {
  return this.members.find((member: ICommitteeMember) => 
    member.position === 'chairperson' && member.isActive
  ) || null;
};

committeeSchema.methods.getActiveMembers = function(): ICommitteeMember[] {
  return this.members.filter((member: ICommitteeMember) => member.isActive);
};

committeeSchema.methods.scheduleMeeting = function(meetingData: Partial<ICommitteeMeeting>): void {
  const meetingNumber = this.meetings.length + 1;
  this.meetings.push({
    meetingNumber,
    ...meetingData,
  });
  this.performanceMetrics.meetingsScheduled += 1;
};

committeeSchema.methods.addMember = function(memberData: Partial<ICommitteeMember>): void {
  this.members.push({
    ...memberData,
    joinDate: new Date(),
    isActive: true,
  });
};

committeeSchema.methods.removeMember = function(memberId: mongoose.Types.ObjectId, reason?: string): void {
  const memberIndex = this.members.findIndex(
    (member: ICommitteeMember) => member.member.toString() === memberId.toString()
  );
  
  if (memberIndex !== -1) {
    this.members[memberIndex].isActive = false;
    this.members[memberIndex].endDate = new Date();
    if (reason) {
      this.members[memberIndex].appointmentReason = reason;
    }
  }
};

committeeSchema.methods.calculateQuorum = function(): number {
  if (this.quorum) return this.quorum;
  
  const activeMembers = this.getActiveMembers().length;
  return Math.ceil(activeMembers / 2) + 1;
};

committeeSchema.methods.isQuorumMet = function(attendeeCount: number): boolean {
  return attendeeCount >= this.calculateQuorum();
};

// Pre-save middleware
committeeSchema.pre('save', function(next) {
  // Auto-calculate quorum if not set
  if (!this.quorum) {
    this.quorum = this.calculateQuorum();
  }
  
  // Initialize performance metrics if not set
  if (!this.performanceMetrics) {
    this.performanceMetrics = {
      meetingsScheduled: 0,
      meetingsHeld: 0,
      averageAttendance: 0,
      decisionsExecuted: 0,
      actionItemsCompleted: 0,
    };
  }
  
  // Update performance metrics
  if (this.meetings.length > 0) {
    const completedMeetings = this.meetings.filter(meeting => 
      meeting.meetingDate < new Date()
    );
    this.performanceMetrics.meetingsHeld = completedMeetings.length;
    
    if (completedMeetings.length > 0) {
      const totalAttendance = completedMeetings.reduce((sum, meeting) => 
        sum + meeting.attendees.filter(attendee => attendee.attended).length, 0
      );
      this.performanceMetrics.averageAttendance = Math.round(
        totalAttendance / completedMeetings.length
      );
    }
  }
  
  next();
});

// Indexes
committeeSchema.index({ code: 1 });
committeeSchema.index({ name: 1 });
committeeSchema.index({ type: 1, category: 1 });
committeeSchema.index({ status: 1 });
committeeSchema.index({ 'members.member': 1, 'members.isActive': 1 });
committeeSchema.index({ establishedDate: -1 });

export const Committee = mongoose.models.Committee || 
  mongoose.model<ICommittee>('Committee', committeeSchema);
