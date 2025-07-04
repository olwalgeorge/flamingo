import mongoose from 'mongoose';

// TypeScript interfaces
export interface IApplicationReference {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  organization?: string;
  contactedDate?: Date;
  response?: 'positive' | 'negative' | 'neutral' | 'no-response';
  notes?: string;
}

export interface IApplicationDocument {
  type: 'id-copy' | 'photo' | 'certificate' | 'recommendation' | 'other';
  filename: string;
  url: string;
  uploadDate: Date;
  verified: boolean;
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedDate?: Date;
}

export interface IApplicationReview {
  reviewedBy: mongoose.Types.ObjectId;
  reviewDate: Date;
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

export interface IMembershipApplication extends mongoose.Document {
  // Basic Application Info
  applicationNumber: string;
  applicationDate: Date;
  applicantType: 'individual' | 'family' | 'corporate' | 'institutional';
  
  // Applicant Information
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
  address: {
    street?: string;
    city?: string;
    county?: string;
    country?: string;
    postalCode?: string;
  };
  
  // Professional Information
  occupation?: string;
  employer?: string;
  workAddress?: {
    street?: string;
    city?: string;
    county?: string;
    country?: string;
    postalCode?: string;
  };
  workPhone?: string;
  workEmail?: string;
  education?: string;
  professionalQualifications?: string[];
  
  // Membership Details
  requestedMembershipType: 'ordinary' | 'patron' | 'honorary' | 'student' | 'senior' | 'corporate';
  requestedMembershipCategory: 'individual' | 'family' | 'corporate' | 'institutional';
  reasonForJoining: string;
  howDidYouHear: string;
  previousMembership?: {
    organization: string;
    membershipType: string;
    duration: string;
    reason: string;
  };
  
  // Skills and Interests
  skills: string[];
  interests: string[];
  committeesOfInterest: string[];
  volunteerAvailability: 'high' | 'medium' | 'low' | 'none';
  
  // Emergency Contact
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    phoneCountryCode: string;
    email?: string;
  };
  
  // References
  references: IApplicationReference[];
  
  // Documents
  documents: IApplicationDocument[];
  
  // Application Status
  status: 'submitted' | 'under-review' | 'approved' | 'rejected' | 'withdrawn' | 'expired';
  substatus?: 'awaiting-documents' | 'awaiting-references' | 'awaiting-payment' | 'awaiting-interview';
  
  // Review Process
  reviews: IApplicationReview[];
  finalDecision?: 'approve' | 'reject';
  finalDecisionDate?: Date;
  finalDecisionBy?: mongoose.Types.ObjectId;
  finalDecisionReason?: string;
  
  // Interview
  interviewScheduled?: Date;
  interviewConductedBy?: mongoose.Types.ObjectId;
  interviewNotes?: string;
  interviewScore?: number;
  
  // Payment
  membershipFeeAmount?: number;
  membershipFeeCurrency?: string;
  membershipFeePaid?: boolean;
  membershipFeePaymentDate?: Date;
  membershipFeeReceiptNumber?: string;
  
  // Conversion to Member
  convertedToMember?: boolean;
  memberId?: mongoose.Types.ObjectId;
  conversionDate?: Date;
  
  // Communication
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    newsletter: boolean;
    eventUpdates: boolean;
  };
  
  // Admin
  assignedReviewer?: mongoose.Types.ObjectId;
  internalNotes?: string;
  
  // Methods
  generateApplicationNumber(): string;
  addReview(reviewData: Partial<IApplicationReview>): void;
  updateStatus(newStatus: string, substatus?: string): void;
  isDocumentationComplete(): boolean;
  isReferencesComplete(): boolean;
  calculateScore(): number;
}

const membershipApplicationSchema = new mongoose.Schema<IMembershipApplication>({
  // Basic Application Info
  applicationNumber: {
    type: String,
    unique: true,
    required: true,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  applicantType: {
    type: String,
    enum: ['individual', 'family', 'corporate', 'institutional'],
    default: 'individual',
  },
  
  // Applicant Information
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
  idNumber: String,
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
  
  // Membership Details
  requestedMembershipType: {
    type: String,
    enum: ['ordinary', 'patron', 'honorary', 'student', 'senior', 'corporate'],
    default: 'ordinary',
  },
  requestedMembershipCategory: {
    type: String,
    enum: ['individual', 'family', 'corporate', 'institutional'],
    default: 'individual',
  },
  reasonForJoining: {
    type: String,
    required: true,
  },
  howDidYouHear: {
    type: String,
    required: true,
  },
  previousMembership: {
    organization: String,
    membershipType: String,
    duration: String,
    reason: String,
  },
  
  // Skills and Interests
  skills: [String],
  interests: [String],
  committeesOfInterest: [String],
  volunteerAvailability: {
    type: String,
    enum: ['high', 'medium', 'low', 'none'],
    default: 'medium',
  },
  
  // Emergency Contact
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
  
  // References
  references: [{
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
    email: String,
    organization: String,
    contactedDate: Date,
    response: {
      type: String,
      enum: ['positive', 'negative', 'neutral', 'no-response'],
    },
    notes: String,
  }],
  
  // Documents
  documents: [{
    type: {
      type: String,
      enum: ['id-copy', 'photo', 'certificate', 'recommendation', 'other'],
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    verifiedDate: Date,
  }],
  
  // Application Status
  status: {
    type: String,
    enum: ['submitted', 'under-review', 'approved', 'rejected', 'withdrawn', 'expired'],
    default: 'submitted',
  },
  substatus: {
    type: String,
    enum: ['awaiting-documents', 'awaiting-references', 'awaiting-payment', 'awaiting-interview'],
  },
  
  // Review Process
  reviews: [{
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    reviewDate: {
      type: Date,
      default: Date.now,
    },
    decision: {
      type: String,
      enum: ['approve', 'reject', 'pending', 'request-more-info'],
      required: true,
    },
    comments: String,
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
    criteria: {
      eligibility: Boolean,
      documentation: Boolean,
      references: Boolean,
      interview: Boolean,
      background: Boolean,
    },
  }],
  
  finalDecision: {
    type: String,
    enum: ['approve', 'reject'],
  },
  finalDecisionDate: Date,
  finalDecisionBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  finalDecisionReason: String,
  
  // Interview
  interviewScheduled: Date,
  interviewConductedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  interviewNotes: String,
  interviewScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  
  // Payment
  membershipFeeAmount: Number,
  membershipFeeCurrency: {
    type: String,
    default: 'KES',
  },
  membershipFeePaid: {
    type: Boolean,
    default: false,
  },
  membershipFeePaymentDate: Date,
  membershipFeeReceiptNumber: String,
  
  // Conversion to Member
  convertedToMember: {
    type: Boolean,
    default: false,
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  },
  conversionDate: Date,
  
  // Communication
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
  
  // Admin
  assignedReviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  internalNotes: String,
}, {
  timestamps: true,
});

// Instance Methods
membershipApplicationSchema.methods.generateApplicationNumber = function(): string {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const randomNum = Math.floor(Math.random() * 900) + 100;
  return `APP${year}${month}${randomNum}`;
};

membershipApplicationSchema.methods.addReview = function(reviewData: Partial<IApplicationReview>): void {
  this.reviews.push({
    ...reviewData,
    reviewDate: new Date(),
  });
};

membershipApplicationSchema.methods.updateStatus = function(newStatus: string, substatus?: string): void {
  this.status = newStatus;
  if (substatus) {
    this.substatus = substatus;
  }
};

membershipApplicationSchema.methods.isDocumentationComplete = function(): boolean {
  const requiredDocs = ['id-copy', 'photo'];
  return requiredDocs.every(docType => 
    this.documents.some((doc: IApplicationDocument) => doc.type === docType && doc.verified)
  );
};

membershipApplicationSchema.methods.isReferencesComplete = function(): boolean {
  return this.references.length >= 2 && 
         this.references.filter((ref: IApplicationReference) => ref.response === 'positive').length >= 1;
};

membershipApplicationSchema.methods.calculateScore = function(): number {
  if (this.reviews.length === 0) return 0;
  
  const totalScore = this.reviews.reduce((sum: number, review: IApplicationReview) => 
    sum + (review.score || 0), 0
  );
  return Math.round(totalScore / this.reviews.length);
};

// Pre-save middleware
membershipApplicationSchema.pre('save', function(next) {
  if (this.isNew && !this.applicationNumber) {
    this.applicationNumber = this.generateApplicationNumber();
  }
  next();
});

// Indexes
membershipApplicationSchema.index({ applicationNumber: 1 });
membershipApplicationSchema.index({ email: 1 });
membershipApplicationSchema.index({ status: 1, substatus: 1 });
membershipApplicationSchema.index({ applicationDate: -1 });
membershipApplicationSchema.index({ assignedReviewer: 1, status: 1 });

export const MembershipApplication = mongoose.models.MembershipApplication || 
  mongoose.model<IMembershipApplication>('MembershipApplication', membershipApplicationSchema);
