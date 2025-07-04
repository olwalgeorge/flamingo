# Database Seeding Script Documentation

## Overview

This documentation covers the database seeding scripts for the Flamingo CBO application, which automatically populate the MongoDB database with initial company details, admin users, and contact information.

## 🚀 Scripts Available

### 1. Seed Database (`npm run seed`)

Populates the database with initial data including:

- Organization/Company profile
- Super admin user
- Department contact information

### 2. Verify Setup (`npm run verify`)

Verifies that the database has been properly seeded and displays comprehensive statistics.

## 📦 Dependencies Required

The seeding scripts require the following packages:

```bash
npm install mongoose bcryptjs dotenv tsx
npm install --save-dev @types/bcryptjs
```

## 🏢 Organization Data Created

### Company Profile

- **Name**: Flamingo Community-Based Organization
- **Short Name**: Flamingo CBO
- **Registration Number**: CBO/2020/001234
- **Tax ID**: P051234567M
- **Founded**: January 15, 2020

### Contact Information

- **Email**: info@flamingocbo.org
- **Phone**: +254712345678
- **Alternative Phone**: +254787654321
- **Website**: https://www.flamingocbo.org
- **Toll-Free**: 0800-123-456

### Address

- **Street**: 123 Community Drive, Green Valley Estate
- **City**: Nairobi
- **County**: Nairobi
- **Postal Code**: 00100
- **Country**: Kenya
- **Coordinates**: Lat: -1.2921, Lng: 36.8219

### Social Media

- **Facebook**: https://facebook.com/flamingocbo
- **Twitter**: https://twitter.com/flamingocbo
- **Instagram**: https://instagram.com/flamingocbo
- **LinkedIn**: https://linkedin.com/company/flamingocbo
- **YouTube**: https://youtube.com/@flamingocbo

### Banking Details

- **Bank**: Equity Bank Kenya
- **Account Number**: 1234567890
- **Account Name**: Flamingo Community-Based Organization
- **SWIFT Code**: EQBLKENA
- **Branch Code**: 068

### M-Pesa Details

- **Paybill Number**: 123456
- **Account Number**: FLAMINGO
- **Till Number**: 987654

### Operating Hours

- **Monday-Friday**: 08:00 - 17:00
- **Saturday**: 09:00 - 13:00
- **Sunday**: Closed

## 👤 Admin User Created

### Super Admin Details

- **Name**: George Olwal
- **Email**: admin@flamingocbo.org
- **Username**: georgeolwal
- **Password**: SecureAdmin@2025
- **Role**: super-admin
- **Department**: administration
- **Title**: Executive Director

### Permissions

The super admin has full permissions across all modules:

- Members (create, read, update, delete, approve)
- Events (create, read, update, delete, publish)
- Donations (create, read, update, delete)
- Newsletter (create, read, update, delete, publish)
- Contacts (create, read, update, delete)
- Settings (create, read, update, delete)
- Reports (create, read, update, delete)
- Users (create, read, update, delete)

## 📞 Department Contacts Created

### 1. Administration

- **Name**: George Olwal
- **Title**: Executive Director
- **Email**: admin@flamingocbo.org
- **Phone**: +254712345678
- **Responsibilities**:
  - Strategic planning and organizational development
  - Board relations and governance
  - Partnership development and stakeholder management
  - Policy development and implementation

### 2. Programs

- **Name**: Sarah Wanjiku
- **Title**: Programs Manager
- **Email**: programs@flamingocbo.org
- **Phone**: +254723456789
- **Responsibilities**:
  - Environmental conservation program management
  - Community outreach and engagement
  - Project planning and implementation
  - Impact assessment and reporting

### 3. Finance

- **Name**: James Kimani
- **Title**: Finance Officer
- **Email**: finance@flamingocbo.org
- **Phone**: +254734567890
- **Responsibilities**:
  - Financial planning and budgeting
  - Donor reporting and compliance
  - Grant writing and fundraising support
  - Financial record keeping and audit preparation

### 4. Communications

- **Name**: Mary Achieng
- **Title**: Communications Coordinator
- **Email**: communications@flamingocbo.org
- **Phone**: +254745678901
- **Responsibilities**:
  - Website and social media management
  - Newsletter and publication coordination
  - Media relations and press releases
  - Event documentation and promotion

## 🔧 Usage Instructions

### Running the Seeding Script

```bash
# Install dependencies
npm install

# Run the seeding script
npm run seed

# Verify the setup
npm run verify
```

### Expected Output

The seeding script will:

1. Connect to MongoDB
2. Clear existing organization, admin, and contact data
3. Create new records
4. Display success messages with login credentials

### Verification Output

The verification script provides:

- Database connection status
- Organization details
- Admin user information
- Contact information summary
- Database statistics
- Next steps for getting started

## 🔐 Security Considerations

### Password Security

- Default admin password: `SecureAdmin@2025`
- **Important**: Change the default password immediately after first login
- Passwords are hashed using bcrypt with salt rounds of 12

### Account Security Features

- Account lockout after 5 failed login attempts
- Password reset token support
- Two-factor authentication support (disabled by default)
- Audit logging for admin actions

## 🛠️ Customization

### Modifying Organization Data

Edit the `organizationData` object in `scripts/seedDatabase.ts`:

```typescript
const organizationData = {
  name: "Your Organization Name",
  shortName: "Your CBO",
  description: "Your organization description",
  // ... other fields
};
```

### Modifying Admin User

Edit the `adminData` object in `scripts/seedDatabase.ts`:

```typescript
const adminData = {
  firstName: "Your",
  lastName: "Name",
  email: "your-email@domain.com",
  username: "yourusername",
  password: "YourSecurePassword",
  // ... other fields
};
```

### Adding More Contacts

Add entries to the `contactsData` array in `scripts/seedDatabase.ts`:

```typescript
const contactsData = [
  // ... existing contacts
  {
    department: "new-department",
    name: "Contact Name",
    title: "Contact Title",
    // ... other fields
  },
];
```

## 🚨 Troubleshooting

### Common Issues

1. **Connection Error**

   - Verify MongoDB connection string in `.env.local`
   - Ensure special characters in passwords are properly encoded
   - Check internet connection and MongoDB Atlas settings

2. **Permission Errors**

   - Ensure the MongoDB user has read/write permissions
   - Check database name in connection string

3. **Duplicate Data Errors**
   - The script automatically removes existing data before inserting
   - If errors persist, manually clear the collections

### MongoDB Index Warnings

The warning messages about duplicate indexes are harmless and occur due to Mongoose's automatic index creation. They don't affect functionality.

## 🔄 Re-running Scripts

### Resetting Data

To completely reset the database:

```bash
npm run seed:reset
```

This will:

- Remove all existing organization, admin, and contact data
- Create fresh records with the default data
- Preserve member and event data

### Backup Considerations

Before running seeding scripts in production:

1. Create a database backup
2. Test scripts in a development environment
3. Review all data being inserted
4. Update default passwords and sensitive information

## 📊 Database Models

### Organization Model

- Company profile and settings
- Contact information and addresses
- Banking and payment details
- Operating hours and services
- Achievements and partnerships

### Admin Model

- User authentication and authorization
- Role-based permissions
- Profile and employment information
- Security features (2FA, account locking)
- Audit logging

### Contact Model

- Department-based organization
- Contact details and responsibilities
- Office hours and location information
- Priority-based ordering

## 🔗 Related Documentation

- [MongoDB Setup Guide](./MONGODB_SETUP_GUIDE.md)
- [Dynamic Contact System](./DYNAMIC_CONTACT_SYSTEM.md)
- [API Documentation](./API_DOCUMENTATION.md)

## 📞 Support

For issues with the seeding scripts:

1. Check the console output for specific error messages
2. Verify environment variables are properly set
3. Ensure all dependencies are installed
4. Run the verification script to diagnose issues

The seeding scripts provide a robust foundation for the Flamingo CBO application with realistic, comprehensive data that reflects a typical community-based organization structure.
