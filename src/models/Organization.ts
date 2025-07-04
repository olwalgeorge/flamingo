import mongoose from 'mongoose';

// TypeScript interfaces for better type safety
export interface IContact {
  email: string;
  phone: string;
  phoneCountryCode: string;
  alternativePhone?: string;
  website?: string;
  tollFreeNumber?: string;
}

export interface IAddress {
  street: string;
  city: string;
  county: string;
  postalCode?: string;
  country: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
}

export interface ISocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

export interface IBankDetails {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  swiftCode?: string;
  branchCode?: string;
}

export interface IMpesaDetails {
  paybillNumber?: string;
  accountNumber?: string;
  tillNumber?: string;
}

export interface IOperatingHours {
  monday: { open: string; close: string; isClosed: boolean };
  tuesday: { open: string; close: string; isClosed: boolean };
  wednesday: { open: string; close: string; isClosed: boolean };
  thursday: { open: string; close: string; isClosed: boolean };
  friday: { open: string; close: string; isClosed: boolean };
  saturday: { open: string; close: string; isClosed: boolean };
  sunday: { open: string; close: string; isClosed: boolean };
}

export interface IOrganization extends mongoose.Document {
  name: string;
  shortName?: string;
  description: string;
  mission: string;
  vision: string;
  foundedDate: Date;
  registrationNumber?: string;
  taxId?: string;
  contact: IContact;
  address: IAddress;
  socialMedia?: ISocialMedia;
  bankDetails?: IBankDetails;
  mpesaDetails?: IMpesaDetails;
  logo?: { url?: string; alt?: string };
  coverImage?: { url?: string; alt?: string };
  operatingHours?: IOperatingHours;
  categories: string[];
  services: string[];
  isActive: boolean;
}

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  shortName: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  foundedDate: {
    type: Date,
    required: true,
  },
  registrationNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  taxId: {
    type: String,
    unique: true,
    sparse: true,
  },
  contact: {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    phoneCountryCode: {
      type: String,
      default: '+254',
    },
    alternativePhone: String,
    website: String,
    tollFreeNumber: String,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    county: {
      type: String,
      required: true,
    },
    postalCode: String,
    country: {
      type: String,
      default: 'Kenya',
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String,
    tiktok: String,
  },
  bankDetails: {
    bankName: String,
    accountNumber: String,
    accountName: String,
    swiftCode: String,
    branchCode: String,
  },
  mpesaDetails: {
    paybillNumber: String,
    accountNumber: String,
    tillNumber: String,
  },
  logo: {
    url: String,
    alt: String,
  },
  coverImage: {
    url: String,
    alt: String,
  },
  documents: [{
    name: String,
    type: {
      type: String,
      enum: ['certificate', 'license', 'permit', 'report', 'other'],
    },
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  }],
  operatingHours: {
    monday: { open: String, close: String, isClosed: Boolean },
    tuesday: { open: String, close: String, isClosed: Boolean },
    wednesday: { open: String, close: String, isClosed: Boolean },
    thursday: { open: String, close: String, isClosed: Boolean },
    friday: { open: String, close: String, isClosed: Boolean },
    saturday: { open: String, close: String, isClosed: Boolean },
    sunday: { open: String, close: String, isClosed: Boolean },
  },
  categories: [{
    type: String,
    enum: ['environmental', 'education', 'health', 'community', 'youth', 'women', 'elderly', 'disability', 'poverty', 'other'],
  }],
  services: [String],
  achievements: [{
    title: String,
    description: String,
    date: Date,
    image: String,
  }],
  partnerships: [{
    name: String,
    type: {
      type: String,
      enum: ['government', 'ngo', 'private', 'international', 'academic', 'other'],
    },
    description: String,
    startDate: Date,
    endDate: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  }],
  settings: {
    theme: {
      primaryColor: String,
      secondaryColor: String,
      accentColor: String,
    },
    features: {
      donations: {
        type: Boolean,
        default: true,
      },
      events: {
        type: Boolean,
        default: true,
      },
      membership: {
        type: Boolean,
        default: true,
      },
      newsletter: {
        type: Boolean,
        default: true,
      },
      volunteer: {
        type: Boolean,
        default: true,
      },
    },
    notifications: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      smsNotifications: {
        type: Boolean,
        default: false,
      },
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Add indexes (registrationNumber already has unique index)
organizationSchema.index({ name: 1 });
organizationSchema.index({ 'contact.email': 1 });

export const Organization = mongoose.models.Organization || mongoose.model<IOrganization>('Organization', organizationSchema);
