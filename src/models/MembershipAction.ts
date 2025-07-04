import mongoose from 'mongoose';

// TypeScript interfaces
export interface IMembershipAction extends mongoose.Document {
  member: mongoose.Types.ObjectId;
  actionType: 'approval' | 'suspension' | 'reinstatement' | 'expulsion' | 'resignation' | 'renewal' | 'fee-payment' | 'warning' | 'probation' | 'status-change' | 'other';
  actionDate: Date;
  actionBy: mongoose.Types.ObjectId;
  
  // Action Details
  reason: string;
  description?: string;
  previousStatus?: string;
  newStatus?: string;
  
  // Associated Data
  associatedApplication?: mongoose.Types.ObjectId;
  associatedPayment?: mongoose.Types.ObjectId;
  associatedEvent?: mongoose.Types.ObjectId;
  
  // Suspension/Expulsion Details
  suspensionDuration?: number; // in days
  suspensionEndDate?: Date;
  suspensionConditions?: string[];
  
  // Probation Details
  probationDuration?: number; // in days
  probationEndDate?: Date;
  probationConditions?: string[];
  
  // Warning Details
  warningLevel?: 'verbal' | 'written' | 'final';
  warningExpiryDate?: Date;
  
  // Fee Payment Details
  feeAmount?: number;
  feeCurrency?: string;
  feeType?: 'membership' | 'penalty' | 'late-fee' | 'other';
  paymentMethod?: string;
  receiptNumber?: string;
  
  // Renewal Details
  renewalPeriod?: number; // in years
  renewalFeeAmount?: number;
  renewalFeeCurrency?: string;
  
  // Document Attachments
  documents?: {
    type: string;
    filename: string;
    url: string;
    uploadDate: Date;
  }[];
  
  // Notification
  notificationSent?: boolean;
  notificationDate?: Date;
  notificationMethod?: 'email' | 'sms' | 'letter' | 'in-person';
  
  // Review and Appeal
  canBeAppealed?: boolean;
  appealDeadline?: Date;
  appealSubmitted?: boolean;
  appealDate?: Date;
  appealReason?: string;
  appealDecision?: 'upheld' | 'overturned' | 'modified';
  appealDecisionDate?: Date;
  appealDecisionBy?: mongoose.Types.ObjectId;
  
  // Effective Dates
  effectiveDate?: Date;
  expiryDate?: Date;
  
  // Internal Notes
  internalNotes?: string;
  followUpRequired?: boolean;
  followUpDate?: Date;
  followUpCompleted?: boolean;
  
  // Status
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'expired' | 'appealed';
  isActive: boolean;
}

const membershipActionSchema = new mongoose.Schema<IMembershipAction>({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  actionType: {
    type: String,
    enum: ['approval', 'suspension', 'reinstatement', 'expulsion', 'resignation', 'renewal', 'fee-payment', 'warning', 'probation', 'status-change', 'other'],
    required: true,
  },
  actionDate: {
    type: Date,
    default: Date.now,
  },
  actionBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  
  // Action Details
  reason: {
    type: String,
    required: true,
  },
  description: String,
  previousStatus: String,
  newStatus: String,
  
  // Associated Data
  associatedApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MembershipApplication',
  },
  associatedPayment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation',
  },
  associatedEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
  
  // Suspension/Expulsion Details
  suspensionDuration: Number, // in days
  suspensionEndDate: Date,
  suspensionConditions: [String],
  
  // Probation Details
  probationDuration: Number, // in days
  probationEndDate: Date,
  probationConditions: [String],
  
  // Warning Details
  warningLevel: {
    type: String,
    enum: ['verbal', 'written', 'final'],
  },
  warningExpiryDate: Date,
  
  // Fee Payment Details
  feeAmount: Number,
  feeCurrency: {
    type: String,
    default: 'KES',
  },
  feeType: {
    type: String,
    enum: ['membership', 'penalty', 'late-fee', 'other'],
  },
  paymentMethod: String,
  receiptNumber: String,
  
  // Renewal Details
  renewalPeriod: Number, // in years
  renewalFeeAmount: Number,
  renewalFeeCurrency: {
    type: String,
    default: 'KES',
  },
  
  // Document Attachments
  documents: [{
    type: String,
    filename: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  }],
  
  // Notification
  notificationSent: {
    type: Boolean,
    default: false,
  },
  notificationDate: Date,
  notificationMethod: {
    type: String,
    enum: ['email', 'sms', 'letter', 'in-person'],
  },
  
  // Review and Appeal
  canBeAppealed: {
    type: Boolean,
    default: false,
  },
  appealDeadline: Date,
  appealSubmitted: {
    type: Boolean,
    default: false,
  },
  appealDate: Date,
  appealReason: String,
  appealDecision: {
    type: String,
    enum: ['upheld', 'overturned', 'modified'],
  },
  appealDecisionDate: Date,
  appealDecisionBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  
  // Effective Dates
  effectiveDate: Date,
  expiryDate: Date,
  
  // Internal Notes
  internalNotes: String,
  followUpRequired: {
    type: Boolean,
    default: false,
  },
  followUpDate: Date,
  followUpCompleted: {
    type: Boolean,
    default: false,
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled', 'expired', 'appealed'],
    default: 'pending',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Pre-save middleware
membershipActionSchema.pre('save', function(next) {
  // Auto-calculate end dates based on duration
  if (this.actionType === 'suspension' && this.suspensionDuration && !this.suspensionEndDate) {
    this.suspensionEndDate = new Date(this.actionDate.getTime() + (this.suspensionDuration * 24 * 60 * 60 * 1000));
  }
  
  if (this.actionType === 'probation' && this.probationDuration && !this.probationEndDate) {
    this.probationEndDate = new Date(this.actionDate.getTime() + (this.probationDuration * 24 * 60 * 60 * 1000));
  }
  
  if (this.actionType === 'warning' && this.warningLevel && !this.warningExpiryDate) {
    const warningDurations = {
      'verbal': 30,
      'written': 180,
      'final': 365
    };
    const days = warningDurations[this.warningLevel];
    this.warningExpiryDate = new Date(this.actionDate.getTime() + (days * 24 * 60 * 60 * 1000));
  }
  
  // Set appeal deadline for appealable actions
  if (this.canBeAppealed && !this.appealDeadline) {
    this.appealDeadline = new Date(this.actionDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days
  }
  
  next();
});

// Indexes
membershipActionSchema.index({ member: 1, actionDate: -1 });
membershipActionSchema.index({ actionType: 1, status: 1 });
membershipActionSchema.index({ actionBy: 1, actionDate: -1 });
membershipActionSchema.index({ status: 1, isActive: 1 });
membershipActionSchema.index({ followUpRequired: 1, followUpDate: 1 });

export const MembershipAction = mongoose.models.MembershipAction || 
  mongoose.model<IMembershipAction>('MembershipAction', membershipActionSchema);
