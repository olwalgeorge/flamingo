import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// TypeScript interfaces for better type safety
export interface IPermission {
  module: 'members' | 'events' | 'donations' | 'newsletter' | 'contacts' | 'settings' | 'reports' | 'users';
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve' | 'publish')[];
}

export interface IAddress {
  street?: string;
  city?: string;
  county?: string;
  country?: string;
}

export interface IEmergencyContact {
  name?: string;
  relationship?: string;
  phone?: string;
  phoneCountryCode?: string;
}

export interface IEmployment {
  startDate: Date;
  endDate?: Date;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'volunteer';
  salary?: number;
  currency: string;
}

export interface ITwoFactorAuth {
  enabled: boolean;
  secret?: string;
  backupCodes: string[];
}

export interface IPreferences {
  language: string;
  timezone: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export interface IAuditLog {
  action?: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  details?: unknown;
}

export interface IAdmin extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  phoneCountryCode: string;
  role: 'super-admin' | 'admin' | 'moderator' | 'editor';
  permissions: IPermission[];
  profileImage?: string;
  department: 'administration' | 'programs' | 'finance' | 'communications' | 'operations' | 'other';
  title?: string;
  bio?: string;
  address?: IAddress;
  emergencyContact?: IEmergencyContact;
  employment: IEmployment;
  lastLogin?: Date;
  loginAttempts: number;
  isLocked: boolean;
  lockUntil?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  isFirstLogin: boolean;
  mustChangePassword: boolean;
  twoFactorAuth: ITwoFactorAuth;
  preferences: IPreferences;
  auditLog: IAuditLog[];
  isActive: boolean;
  createdBy?: mongoose.Types.ObjectId;
  fullName: string; // Virtual field
  comparePassword(candidatePassword: string): Promise<boolean>;
  isUsingDefaultPassword(): Promise<boolean>;
  incLoginAttempts(): Promise<unknown>;
}

const adminSchema = new mongoose.Schema({
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
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
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
  role: {
    type: String,
    enum: ['super-admin', 'admin', 'moderator', 'editor'],
    default: 'admin',
  },
  permissions: [{
    module: {
      type: String,
      enum: ['members', 'events', 'donations', 'newsletter', 'contacts', 'settings', 'reports', 'users'],
    },
    actions: [{
      type: String,
      enum: ['create', 'read', 'update', 'delete', 'approve', 'publish'],
    }],
  }],
  profileImage: String,
  department: {
    type: String,
    enum: ['administration', 'programs', 'finance', 'communications', 'operations', 'other'],
    default: 'administration',
  },
  title: {
    type: String,
    trim: true,
  },
  bio: String,
  address: {
    street: String,
    city: String,
    county: String,
    country: {
      type: String,
      default: 'Kenya',
    },
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    phoneCountryCode: String,
  },
  employment: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'volunteer'],
      default: 'full-time',
    },
    salary: Number,
    currency: {
      type: String,
      default: 'KES',
    },
  },
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0,
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  lockUntil: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
  mustChangePassword: {
    type: Boolean,
    default: true,
  },
  twoFactorAuth: {
    enabled: {
      type: Boolean,
      default: false,
    },
    secret: String,
    backupCodes: [String],
  },
  preferences: {
    language: {
      type: String,
      default: 'en',
    },
    timezone: {
      type: String,
      default: 'Africa/Nairobi',
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    smsNotifications: {
      type: Boolean,
      default: false,
    },
  },
  auditLog: [{
    action: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
    ipAddress: String,
    userAgent: String,
    details: mongoose.Schema.Types.Mixed,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
}, {
  timestamps: true,
});

// Virtual for full name
adminSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Password hashing middleware
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Password comparison method
adminSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if admin is using default password
adminSchema.methods.isUsingDefaultPassword = async function(): Promise<boolean> {
  const defaultPasswords = ['SecureAdmin@2025', 'AdminPass123!', 'admin123', 'password123'];
  
  for (const defaultPassword of defaultPasswords) {
    const isMatch = await bcrypt.compare(defaultPassword, this.password);
    if (isMatch) {
      return true;
    }
  }
  return false;
};

// Account locking methods
adminSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates: Record<string, unknown> = { $inc: { loginAttempts: 1 } };
  
  // If we're at max attempts and not locked already, lock the account
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = {
      lockUntil: Date.now() + 2 * 60 * 60 * 1000, // Lock for 2 hours
      isLocked: true
    };
  }
  
  return this.updateOne(updates);
};

// Add indexes
adminSchema.index({ email: 1 });
adminSchema.index({ username: 1 });
adminSchema.index({ role: 1, isActive: 1 });
adminSchema.index({ department: 1 });
adminSchema.index({ lastLogin: -1 });

export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema);
