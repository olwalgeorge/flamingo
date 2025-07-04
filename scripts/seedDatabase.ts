import dotenv from 'dotenv';
import connectDB from '../src/lib/mongodb';
import { Organization } from '../src/models/Organization';
import { Admin } from '../src/models/Admin';
import { Contact } from '../src/models/Contact';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Company/Organization data
const organizationData = {
  name: "Flamingo Community-Based Organization",
  shortName: "Flamingo CBO",
  description: "A dedicated community-based organization focused on environmental conservation, community development, and sustainable growth initiatives in Kenya.",
  mission: "To empower local communities through environmental conservation, education, and sustainable development programs that create lasting positive impact.",
  vision: "A thriving, sustainable community where environmental conservation and social development go hand in hand for future generations.",
  foundedDate: new Date('2020-01-15'),
  registrationNumber: "CBO/2020/001234",
  taxId: "P051234567M",
  contact: {
    email: "info@flamingocbo.org",
    phone: "+254712345678",
    phoneCountryCode: "+254",
    alternativePhone: "+254787654321",
    website: "https://www.flamingocbo.org",
    tollFreeNumber: "0800-123-456",
  },
  address: {
    street: "123 Community Drive, Green Valley Estate",
    city: "Nairobi",
    county: "Nairobi",
    postalCode: "00100",
    country: "Kenya",
    coordinates: {
      lat: -1.2921,
      lng: 36.8219,
    },
  },
  socialMedia: {
    facebook: "https://facebook.com/flamingocbo",
    twitter: "https://twitter.com/flamingocbo",
    instagram: "https://instagram.com/flamingocbo",
    linkedin: "https://linkedin.com/company/flamingocbo",
    youtube: "https://youtube.com/@flamingocbo",
  },
  bankDetails: {
    bankName: "Equity Bank Kenya",
    accountNumber: "1234567890",
    accountName: "Flamingo Community-Based Organization",
    swiftCode: "EQBLKENA",
    branchCode: "068",
  },
  mpesaDetails: {
    paybillNumber: "123456",
    accountNumber: "FLAMINGO",
    tillNumber: "987654",
  },
  logo: {
    url: "/community-logo.svg",
    alt: "Flamingo CBO Logo",
  },
  operatingHours: {
    monday: { open: "08:00", close: "17:00", isClosed: false },
    tuesday: { open: "08:00", close: "17:00", isClosed: false },
    wednesday: { open: "08:00", close: "17:00", isClosed: false },
    thursday: { open: "08:00", close: "17:00", isClosed: false },
    friday: { open: "08:00", close: "17:00", isClosed: false },
    saturday: { open: "09:00", close: "13:00", isClosed: false },
    sunday: { open: "", close: "", isClosed: true },
  },
  categories: ["environmental", "community", "education", "youth"],
  services: [
    "Environmental Conservation",
    "Community Education Programs",
    "Youth Empowerment",
    "Sustainable Development Initiatives",
    "Tree Planting Campaigns",
    "Clean Water Projects",
    "Waste Management Programs",
    "Climate Change Awareness",
  ],
  achievements: [
    {
      title: "10,000 Trees Planted",
      description: "Successfully planted 10,000 indigenous trees across 5 communities",
      date: new Date('2023-12-31'),
    },
    {
      title: "Community Award 2023",
      description: "Received the Best Community Initiative Award from Nairobi County",
      date: new Date('2023-06-15'),
    },
  ],
  partnerships: [
    {
      name: "Kenya Forest Service",
      type: "government",
      description: "Partnership for reforestation and forest conservation programs",
      startDate: new Date('2021-03-01'),
      isActive: true,
    },
    {
      name: "Green Future Foundation",
      type: "ngo",
      description: "Collaboration on environmental education and awareness programs",
      startDate: new Date('2022-01-15'),
      isActive: true,
    },
  ],
  settings: {
    theme: {
      primaryColor: "#16a34a",
      secondaryColor: "#15803d",
      accentColor: "#22c55e",
    },
    features: {
      donations: true,
      events: true,
      membership: true,
      newsletter: true,
      volunteer: true,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
    },
  },
};

// Admin user data
const adminData = {
  firstName: "George",
  lastName: "Olwal",
  email: "admin@flamingocbo.org",
  username: "georgeolwal",
  password: "SecureAdmin@2025", // This will be hashed automatically
  phone: "+254712345678",
  phoneCountryCode: "+254",
  role: "super-admin",
  permissions: [
    {
      module: "members",
      actions: ["create", "read", "update", "delete", "approve"],
    },
    {
      module: "events",
      actions: ["create", "read", "update", "delete", "publish"],
    },
    {
      module: "donations",
      actions: ["create", "read", "update", "delete"],
    },
    {
      module: "newsletter",
      actions: ["create", "read", "update", "delete", "publish"],
    },
    {
      module: "contacts",
      actions: ["create", "read", "update", "delete"],
    },
    {
      module: "settings",
      actions: ["create", "read", "update", "delete"],
    },
    {
      module: "reports",
      actions: ["create", "read", "update", "delete"],
    },
    {
      module: "users",
      actions: ["create", "read", "update", "delete"],
    },
  ],
  department: "administration",
  title: "Executive Director",
  bio: "Experienced community leader with over 10 years in environmental conservation and community development. Passionate about sustainable development and community empowerment.",
  address: {
    city: "Nairobi",
    county: "Nairobi",
    country: "Kenya",
  },
  employment: {
    startDate: new Date('2020-01-15'),
    employmentType: "full-time",
    salary: 80000,
    currency: "KES",
  },
  preferences: {
    language: "en",
    timezone: "Africa/Nairobi",
    emailNotifications: true,
    smsNotifications: true,
  },
};

// Contact information for key departments
const contactsData = [
  {
    department: "administration",
    name: "George Olwal",
    title: "Executive Director",
    description: "Overall organizational leadership and strategic direction",
    responsibilities: [
      "Strategic planning and organizational development",
      "Board relations and governance",
      "Partnership development and stakeholder management",
      "Policy development and implementation",
    ],
    email: "admin@flamingocbo.org",
    phone: "+254712345678",
    phoneCountryCode: "+254",
    officeHours: {
      monday: "08:00 - 17:00",
      tuesday: "08:00 - 17:00",
      wednesday: "08:00 - 17:00",
      thursday: "08:00 - 17:00",
      friday: "08:00 - 17:00",
      saturday: "09:00 - 13:00",
      sunday: "Closed",
    },
    location: {
      building: "Main Office",
      room: "Director's Office",
      floor: "Ground Floor",
      address: "123 Community Drive, Green Valley Estate, Nairobi",
    },
    priority: 10,
  },
  {
    department: "programs",
    name: "Sarah Wanjiku",
    title: "Programs Manager",
    description: "Environmental and community programs coordination",
    responsibilities: [
      "Environmental conservation program management",
      "Community outreach and engagement",
      "Project planning and implementation",
      "Impact assessment and reporting",
    ],
    email: "programs@flamingocbo.org",
    phone: "+254723456789",
    phoneCountryCode: "+254",
    officeHours: {
      monday: "08:00 - 17:00",
      tuesday: "08:00 - 17:00",
      wednesday: "08:00 - 17:00",
      thursday: "08:00 - 17:00",
      friday: "08:00 - 17:00",
      saturday: "Closed",
      sunday: "Closed",
    },
    location: {
      building: "Main Office",
      room: "Programs Office",
      floor: "Ground Floor",
      address: "123 Community Drive, Green Valley Estate, Nairobi",
    },
    priority: 9,
  },
  {
    department: "finance",
    name: "James Kimani",
    title: "Finance Officer",
    description: "Financial management and donor relations",
    responsibilities: [
      "Financial planning and budgeting",
      "Donor reporting and compliance",
      "Grant writing and fundraising support",
      "Financial record keeping and audit preparation",
    ],
    email: "finance@flamingocbo.org",
    phone: "+254734567890",
    phoneCountryCode: "+254",
    officeHours: {
      monday: "08:00 - 17:00",
      tuesday: "08:00 - 17:00",
      wednesday: "08:00 - 17:00",
      thursday: "08:00 - 17:00",
      friday: "08:00 - 17:00",
      saturday: "Closed",
      sunday: "Closed",
    },
    location: {
      building: "Main Office",
      room: "Finance Office",
      floor: "Ground Floor",
      address: "123 Community Drive, Green Valley Estate, Nairobi",
    },
    priority: 8,
  },
  {
    department: "communications",
    name: "Mary Achieng",
    title: "Communications Coordinator",
    description: "Public relations, media, and community communications",
    responsibilities: [
      "Website and social media management",
      "Newsletter and publication coordination",
      "Media relations and press releases",
      "Event documentation and promotion",
    ],
    email: "communications@flamingocbo.org",
    phone: "+254745678901",
    phoneCountryCode: "+254",
    officeHours: {
      monday: "08:00 - 17:00",
      tuesday: "08:00 - 17:00",
      wednesday: "08:00 - 17:00",
      thursday: "08:00 - 17:00",
      friday: "08:00 - 17:00",
      saturday: "Closed",
      sunday: "Closed",
    },
    location: {
      building: "Main Office",
      room: "Communications Office",
      floor: "Ground Floor",
      address: "123 Community Drive, Green Valley Estate, Nairobi",
    },
    priority: 7,
  },
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    
    console.log('🏢 Creating organization profile...');
    // Remove existing organization data
    await Organization.deleteMany({});
    
    // Create new organization
    const organization = new Organization(organizationData);
    await organization.save();
    console.log('✅ Organization created successfully:', organization.name);
    
    console.log('👤 Creating admin user...');
    // Remove existing admin with same email
    await Admin.deleteOne({ email: adminData.email });
    
    // Create new admin
    const admin = new Admin(adminData);
    await admin.save();
    console.log('✅ Admin user created successfully:', admin.email);
    console.log('🔑 IMPORTANT - First-time login credentials:');
    console.log('   Email/Username:', admin.email, '/', admin.username);
    console.log('   Temporary Password:', 'SecureAdmin@2025');
    console.log('   ⚠️  This password MUST be changed on first login!');
    console.log('   ⚠️  Default credentials will not be displayed again for security.');
    
    console.log('📞 Creating contact information...');
    // Remove existing contacts
    await Contact.deleteMany({});
    
    // Create new contacts
    for (const contactData of contactsData) {
      const contact = new Contact(contactData);
      await contact.save();
      console.log(`✅ Contact created: ${contact.department} - ${contact.name}`);
    }
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log('• Organization profile created');
    console.log('• Super admin user created');
    console.log('• 4 department contacts created');
    console.log('\n🔐 Admin Access:');
    console.log('• Email: admin@flamingocbo.org');
    console.log('• Username: georgeolwal');
    console.log('• Password: SecureAdmin@2025');
    console.log('• Role: super-admin');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding script
seedDatabase();
