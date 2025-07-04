import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  fullDescription: String,
  date: {
    type: Date,
    required: true,
  },
  endDate: Date,
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    county: String,
    country: { type: String, default: 'Kenya' },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  category: {
    type: String,
    enum: ['environmental', 'community', 'educational', 'fundraising', 'meeting', 'workshop', 'cleanup', 'other'],
    required: true,
  },
  maxAttendees: {
    type: Number,
    default: null, // null means unlimited
  },
  currentAttendees: {
    type: Number,
    default: 0,
  },
  registeredMembers: [{
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'no-show', 'cancelled'],
      default: 'registered',
    },
  }],
  organizer: {
    type: String,
    required: true,
  },
  contact: {
    email: String,
    phone: String,
  },
  image: String,
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  requirements: [String],
  agenda: [{
    time: String,
    activity: String,
    details: String,
  }],
  resources: [{
    name: String,
    type: String, // 'document', 'link', 'image'
    url: String,
  }],
  tags: [String],
  isPublic: {
    type: Boolean,
    default: true,
  },
  fundraising: {
    isActive: {
      type: Boolean,
      default: false,
    },
    targetAmount: Number,
    currentAmount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'KES',
    },
  },
}, {
  timestamps: true,
});

// Add indexes for better query performance
eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ isPublic: 1, status: 1 });
eventSchema.index({ 'fundraising.isActive': 1 });

export const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
