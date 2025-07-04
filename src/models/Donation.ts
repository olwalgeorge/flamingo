import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donor: {
    name: {
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
      trim: true,
    },
    phoneCountryCode: {
      type: String,
      default: '+254',
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: false, // Not all donors are members
    },
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'KES',
    enum: ['KES', 'USD', 'EUR', 'GBP'],
  },
  donationType: {
    type: String,
    enum: ['one-time', 'monthly', 'yearly', 'event-specific'],
    default: 'one-time',
  },
  purpose: {
    type: String,
    enum: ['general', 'environmental', 'education', 'event', 'emergency', 'infrastructure'],
    default: 'general',
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: false, // Only for event-specific donations
  },
  paymentMethod: {
    type: String,
    enum: ['mpesa', 'bank-transfer', 'cash', 'card', 'paypal', 'other'],
    required: true,
  },
  transactionId: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  receiptNumber: {
    type: String,
    unique: true,
    sparse: true, // Only unique if not null
  },
  notes: String,
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurringInterval: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
  },
  nextPaymentDate: Date,
  campaignId: String,
  taxDeductible: {
    type: Boolean,
    default: true,
  },
  acknowledgmentSent: {
    type: Boolean,
    default: false,
  },
  acknowledgmentDate: Date,
}, {
  timestamps: true,
});

// Add indexes for better query performance
donationSchema.index({ 'donor.email': 1 });
donationSchema.index({ status: 1, createdAt: -1 });
donationSchema.index({ purpose: 1 });
donationSchema.index({ event: 1 });
donationSchema.index({ donationType: 1 });
donationSchema.index({ receiptNumber: 1 });

// Pre-save middleware to generate receipt number
donationSchema.pre('save', async function(next) {
  if (this.isNew && this.status === 'completed' && !this.receiptNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Donation').countDocuments({
      receiptNumber: { $regex: `^${year}-` }
    });
    this.receiptNumber = `${year}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

export const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);
