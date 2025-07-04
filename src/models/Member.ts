import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
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
  address: {
    street: String,
    city: String,
    county: String,
    country: { type: String, default: 'Kenya' },
  },
  membershipType: {
    type: String,
    enum: ['ordinary', 'patron', 'honorary'],
    default: 'ordinary',
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
  skills: [String],
  interests: [String],
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    phoneCountryCode: String,
  },
  profileImage: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  occupation: String,
  workExperience: String,
  education: String,
}, {
  timestamps: true,
});

// Add indexes for better query performance
memberSchema.index({ email: 1 });
memberSchema.index({ membershipType: 1, status: 1 });
memberSchema.index({ joinDate: -1 });

export const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);
