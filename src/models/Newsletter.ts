import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  htmlContent: String, // Rich HTML content
  type: {
    type: String,
    enum: ['newsletter', 'announcement', 'event-reminder', 'thank-you', 'update'],
    default: 'newsletter',
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sent', 'cancelled'],
    default: 'draft',
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
  },
  scheduledDate: Date,
  sentDate: Date,
  recipients: {
    all: {
      type: Boolean,
      default: false, // Send to all active members
    },
    membershipTypes: [{
      type: String,
      enum: ['ordinary', 'patron', 'honorary'],
    }],
    specificMembers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    }],
    externalEmails: [String], // For non-members
  },
  tags: [String],
  category: {
    type: String,
    enum: ['general', 'environmental', 'events', 'fundraising', 'volunteer', 'community'],
    default: 'general',
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    size: Number,
  }],
  images: [{
    url: String,
    alt: String,
    caption: String,
  }],
  relatedEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
  statistics: {
    sent: {
      type: Number,
      default: 0,
    },
    opened: {
      type: Number,
      default: 0,
    },
    clicked: {
      type: Number,
      default: 0,
    },
    bounced: {
      type: Number,
      default: 0,
    },
    unsubscribed: {
      type: Number,
      default: 0,
    },
  },
  template: {
    type: String,
    enum: ['default', 'event', 'fundraising', 'announcement', 'custom'],
    default: 'default',
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal',
  },
}, {
  timestamps: true,
});

// Add indexes for better query performance
newsletterSchema.index({ status: 1, scheduledDate: 1 });
newsletterSchema.index({ type: 1, category: 1 });
newsletterSchema.index({ sentDate: -1 });
newsletterSchema.index({ 'author.email': 1 });
newsletterSchema.index({ tags: 1 });

export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
