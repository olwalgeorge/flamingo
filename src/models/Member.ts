import mongoose from 'mongoose';

// TypeScript interfaces for better type safety
export interface IAddress {
  street?: string;
  city?: string;
  county?: string;
  country?: string;
  postalCode?: string;
}

export interface IEmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  phoneCountryCode: string;
  email?: string;
}

export interface IMembershipFee {
  amount: number;
  currency: string;
  paymentDate: Date;
  paymentMethod: string;
  receiptNumber?: string;
  validUntil: Date;
}

export interface IReference {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  organization?: string;
}

export interface IMemberAuditLog {
  action: string;
  performedBy: mongoose.Types.ObjectId;
  timestamp: Date;
  details?: string;
  previousValue?: unknown;
  newValue?: unknown;
}

export interface IMember extends mongoose.Document {
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  idNumber?: string;
  idType?: 'national-id' | 'passport' | 'driving-license' | 'other';
  
  // Address Information
  address: IAddress;
  
  // Membership Information
  membershipNumber?: string;
  membershipType: 'ordinary' | 'patron' | 'honorary' | 'student' | 'senior' | 'corporate';
  membershipCategory: 'individual' | 'family' | 'corporate' | 'institutional';
  applicationDate: Date;
  approvalDate?: Date;
  joinDate?: Date;
  
  // Status and Lifecycle
  status: 'pending' | 'approved' | 'active' | 'inactive' | 'suspended' | 'expelled' | 'resigned' | 'deceased';
  substatus?: 'probation' | 'grace-period' | 'renewal-due' | 'payment-overdue';
  statusReason?: string;
  statusChangeDate?: Date;
  
  // Professional Information
  occupation?: string;
  employer?: string;
  workAddress?: IAddress;
  workPhone?: string;
  workEmail?: string;
  education?: string;
  professionalQualifications?: string[];
  
  // Skills and Interests
  skills: string[];
  interests: string[];
  committees?: string[];
  specializations?: string[];
  
  // Contact Information
  emergencyContact: IEmergencyContact;
  references?: IReference[];
  
  // Financial Information
  membershipFees: IMembershipFee[];
  currentFeeStatus: 'paid' | 'pending' | 'overdue' | 'exempt';
  feeExemptionReason?: string;
  
  // Documents
  profileImage?: string;
  documents?: {
    type: string;
    url: string;
    uploadDate: Date;
    verified: boolean;
  }[];
  
  // Participation
  eventsAttended?: mongoose.Types.ObjectId[];
  committeesServed?: {
    committee: string;
    position?: string;
    startDate: Date;
    endDate?: Date;
  }[];
  volunteerHours?: number;
  
  // Communication Preferences
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    newsletter: boolean;
    eventUpdates: boolean;
  };
  
  // Admin Information
  approvedBy?: mongoose.Types.ObjectId;
  createdBy?: mongoose.Types.ObjectId;
  lastModifiedBy?: mongoose.Types.ObjectId;
  
  // Audit Trail
  auditLog: IMemberAuditLog[];
  
  // Computed Properties
  fullName: string;
  age?: number;
  membershipDuration?: number;
  isFeeCurrent: boolean;
  
  // Methods
  generateMembershipNumber(): string;
  updateStatus(newStatus: string, reason?: string, performedBy?: mongoose.Types.ObjectId): Promise<void>;
  addAuditLog(action: string, performedBy: mongoose.Types.ObjectId, details?: string): void;
  calculateAge(): number;
  isMembershipExpired(): boolean;
}

const memberSchema = new mongoose.Schema<IMember>({
  // Basic Information
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  phoneCountryCode: {
    type: String,
    default: '+254',
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  nationality: {
    type: String,
    default: 'Kenyan',
  },
  idNumber: {
    type: String,
    sparse: true,
  },
  idType: {
    type: String,
    enum: ['national-id', 'passport', 'driving-license', 'other'],
    default: 'national-id',
  },
  
  // Address Information
  address: {
    street: String,
    city: String,
    county: String,
    country: { 
      type: String, 
      default: 'Kenya' 
    },
    postalCode: String,
  },
  
  // Membership Information
  membershipNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  membershipType: {
    type: String,
    enum: ['ordinary', 'patron', 'honorary', 'student', 'senior', 'corporate'],
    default: 'ordinary',
  },
  membershipCategory: {
    type: String,
    enum: ['individual', 'family', 'corporate', 'institutional'],
    default: 'individual',
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  approvalDate: Date,
  joinDate: Date,
  
  // Status and Lifecycle
  status: {
    type: String,
    enum: ['pending', 'approved', 'active', 'inactive', 'suspended', 'expelled', 'resigned', 'deceased'],
    default: 'pending',
  },
  substatus: {
    type: String,
    enum: ['probation', 'grace-period', 'renewal-due', 'payment-overdue'],
  },
  statusReason: String,
  statusChangeDate: Date,
  
  // Professional Information
  occupation: String,
  employer: String,
  workAddress: {
    street: String,
    city: String,
    county: String,
    country: String,
    postalCode: String,
  },
  workPhone: String,
  workEmail: String,
  education: String,
  professionalQualifications: [String],
  
  // Skills and Interests
  skills: [String],
  interests: [String],
  committees: [String],
  specializations: [String],
  
  // Contact Information
  emergencyContact: {
    name: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    phoneCountryCode: {
      type: String,
      default: '+254',
    },
    email: String,
  },
  references: [{
    name: String,
    relationship: String,
    phone: String,
    email: String,
    organization: String,
  }],
  
  // Financial Information
  membershipFees: [{
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'KES',
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    receiptNumber: String,
    validUntil: {
      type: Date,
      required: true,
    },
  }],
  currentFeeStatus: {
    type: String,
    enum: ['paid', 'pending', 'overdue', 'exempt'],
    default: 'pending',
  },
  feeExemptionReason: String,
  
  // Documents
  profileImage: String,
  documents: [{
    type: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  }],
  
  // Participation
  eventsAttended: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  committeesServed: [{
    committee: String,
    position: String,
    startDate: Date,
    endDate: Date,
  }],
  volunteerHours: {
    type: Number,
    default: 0,
  },
  
  // Communication Preferences
  communicationPreferences: {
    email: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: true,
    },
    whatsapp: {
      type: Boolean,
      default: false,
    },
    newsletter: {
      type: Boolean,
      default: true,
    },
    eventUpdates: {
      type: Boolean,
      default: true,
    },
  },
  
  // Admin Information
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  
  // Audit Trail
  auditLog: [{
    action: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    details: String,
    previousValue: mongoose.Schema.Types.Mixed,
    newValue: mongoose.Schema.Types.Mixed,
  }],
}, {
  timestamps: true,
});

// Virtual properties
memberSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

memberSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  return Math.floor((Date.now() - this.dateOfBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
});

memberSchema.virtual('membershipDuration').get(function() {
  if (!this.joinDate) return null;
  return Math.floor((Date.now() - this.joinDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
});

memberSchema.virtual('isFeeCurrent').get(function() {
  return this.currentFeeStatus === 'paid' || this.currentFeeStatus === 'exempt';
});

// Instance Methods
memberSchema.methods.generateMembershipNumber = function(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `FLM${year}${randomNum}`;
};

memberSchema.methods.updateStatus = async function(
  newStatus: string, 
  reason?: string, 
  performedBy?: mongoose.Types.ObjectId
) {
  const oldStatus = this.status;
  this.status = newStatus;
  this.statusReason = reason;
  this.statusChangeDate = new Date();
  
  if (performedBy) {
    this.lastModifiedBy = performedBy;
    this.addAuditLog(`Status changed from ${oldStatus} to ${newStatus}`, performedBy, reason);
  }
  
  // Auto-set dates based on status
  if (newStatus === 'approved' && !this.approvalDate) {
    this.approvalDate = new Date();
  }
  if (newStatus === 'active' && !this.joinDate) {
    this.joinDate = new Date();
    if (!this.membershipNumber) {
      this.membershipNumber = this.generateMembershipNumber();
    }
  }
  
  await this.save();
};

memberSchema.methods.addAuditLog = function(
  action: string, 
  performedBy: mongoose.Types.ObjectId, 
  details?: string
) {
  this.auditLog.push({
    action,
    performedBy,
    timestamp: new Date(),
    details,
  });
};

memberSchema.methods.calculateAge = function(): number {
  if (!this.dateOfBirth) return 0;
  return Math.floor((Date.now() - this.dateOfBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
};

memberSchema.methods.isMembershipExpired = function(): boolean {
  if (this.currentFeeStatus === 'exempt') return false;
  if (this.membershipFees.length === 0) return true;
  
  const latestFee = this.membershipFees[this.membershipFees.length - 1];
  return latestFee.validUntil < new Date();
};

// Pre-save middleware
memberSchema.pre('save', function(next) {
  // Auto-generate membership number for active members
  if (this.status === 'active' && !this.membershipNumber) {
    this.membershipNumber = this.generateMembershipNumber();
  }
  
  // Update fee status based on membership fees
  if (this.membershipFees.length > 0) {
    const latestFee = this.membershipFees[this.membershipFees.length - 1];
    if (latestFee.validUntil > new Date()) {
      this.currentFeeStatus = 'paid';
    } else {
      this.currentFeeStatus = 'overdue';
    }
  }
  
  next();
});

// Add indexes for better query performance
memberSchema.index({ membershipType: 1, status: 1 });
memberSchema.index({ joinDate: -1 });
memberSchema.index({ status: 1, currentFeeStatus: 1 });
memberSchema.index({ membershipNumber: 1 });
memberSchema.index({ applicationDate: -1 });
memberSchema.index({ approvalDate: -1 });

export const Member = mongoose.models.Member || mongoose.model<IMember>('Member', memberSchema);
