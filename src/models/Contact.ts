import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  responsibilities: [String],
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
  alternativePhone: {
    type: String,
    trim: true,
  },
  alternativePhoneCountryCode: {
    type: String,
    default: '+254',
  },
  officeHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  },
  location: {
    building: String,
    room: String,
    floor: String,
    address: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: Number,
    default: 0, // Higher numbers appear first
  },
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String,
  },
}, {
  timestamps: true,
});

// Add indexes for better query performance
contactSchema.index({ department: 1 });
contactSchema.index({ isActive: 1, priority: -1 });

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
