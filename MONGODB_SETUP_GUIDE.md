# MongoDB Setup with Mongoose - Complete Guide

## Overview

This document provides comprehensive information about the MongoDB setup for the Flamingo CBO web application, including connection configuration, data models, services, and API endpoints.

## 📦 Installation & Setup

### 1. Dependencies Installed

```bash
npm install mongoose
```

### 2. Environment Configuration

The MongoDB connection string is configured in `.env.local`:

```bash
MONGODB_URI=your_mongodb_connection_string_here
```

**Note**: Replace `your_mongodb_connection_string_here` with your actual MongoDB Atlas connection string. Special characters in passwords (like `@`) must be URL-encoded (`@` becomes `%40`).

### 3. Database Connection

- **File**: `src/lib/mongodb.ts`
- **Features**:
  - Connection caching for performance
  - Error handling with detailed logging
  - Hot reload support in development
  - Automatic reconnection

## 🗄️ Data Models

### 1. Member Model (`src/models/Member.ts`)

Comprehensive member management with:

- Personal information (name, email, phone, address)
- Membership details (type, status, join date)
- Skills and interests tracking
- Emergency contact information
- Profile customization options

### 2. Event Model (`src/models/Event.ts`)

Event management system featuring:

- Event details (title, description, date, location)
- Registration tracking with member references
- Fundraising integration
- Agenda and resource management
- Status tracking (upcoming, ongoing, completed, cancelled)

### 3. Contact Model (`src/models/Contact.ts`)

Dynamic contact information system:

- Department-based organization
- Contact details with international phone support
- Office hours and location tracking
- Social media integration
- Priority-based ordering

### 4. Donation Model (`src/models/Donation.ts`)

Comprehensive donation tracking:

- Donor information (members and non-members)
- Multiple payment methods support
- Recurring donation handling
- Receipt generation with auto-numbering
- Campaign and event-specific donations

### 5. Newsletter Model (`src/models/Newsletter.ts`)

Communication management system:

- Multiple content types (newsletter, announcements, reminders)
- Targeted recipient selection
- Template system
- Engagement statistics tracking
- Scheduling and automation support

## 🔧 Services

### Member Service (`src/services/memberService.ts`)

Complete CRUD operations for member management:

```typescript
// Create a new member
await MemberService.createMember(memberData);

// Get all members with pagination and filtering
await MemberService.getAllMembers(page, limit, filters);

// Get specific member
await MemberService.getMemberById(memberId);

// Update member information
await MemberService.updateMember(memberId, updateData);

// Delete member
await MemberService.deleteMember(memberId);

// Get member statistics
await MemberService.getMemberStats();

// Get member activity (events, donations)
await MemberService.getMemberActivity(memberId);
```

## 🚀 API Endpoints

### Member Management

- `GET /api/members` - List all members with pagination and filtering
- `POST /api/members` - Create a new member
- `GET /api/members/[id]` - Get specific member details
- `PUT /api/members/[id]` - Update member information
- `DELETE /api/members/[id]` - Delete a member

### Database Testing

- `GET /api/test-db` - Test database connection and get basic statistics

## 🔍 Example Usage

### Creating a Member

```typescript
const newMember = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+254712345678",
  phoneCountryCode: "+254",
  membershipType: "ordinary",
  skills: ["Environmental Conservation", "Community Organizing"],
  address: {
    city: "Nairobi",
    county: "Nairobi",
    country: "Kenya",
  },
};

const result = await MemberService.createMember(newMember);
```

### API Request Examples

```bash
# Get all members
curl "http://localhost:3000/api/members"

# Get members with filters
curl "http://localhost:3000/api/members?status=active&membershipType=ordinary&page=1&limit=10"

# Create a new member
curl -X POST http://localhost:3000/api/members \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Smith","email":"jane@example.com","phone":"+254712345679"}'
```

## 🛡️ Security Features

1. **Input Validation**: All models include built-in validation
2. **Unique Constraints**: Email uniqueness enforced at database level
3. **Error Handling**: Comprehensive error responses with appropriate HTTP status codes
4. **Type Safety**: Full TypeScript support for all operations

## 📊 Database Indexes

Optimized database performance with strategic indexes:

### Member Collection

```typescript
memberSchema.index({ email: 1 });
memberSchema.index({ membershipType: 1, status: 1 });
memberSchema.index({ joinDate: -1 });
```

### Event Collection

```typescript
eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ isPublic: 1, status: 1 });
```

### Donation Collection

```typescript
donationSchema.index({ "donor.email": 1 });
donationSchema.index({ status: 1, createdAt: -1 });
donationSchema.index({ purpose: 1 });
```

## 🚨 Testing & Verification

The setup has been fully tested with:

- ✅ Database connection verification
- ✅ Member creation and retrieval
- ✅ API endpoint functionality
- ✅ Error handling validation
- ✅ TypeScript type safety

## 🔧 Development Tools

### TypeScript Support

Global type definitions for Mongoose caching in `src/types/global.d.ts`.

### Environment Variables

All sensitive configuration stored securely in `.env.local`.

### Connection Monitoring

Built-in logging for connection status and errors.

## 📈 Next Steps

1. **Extend Models**: Add more fields as needed for specific CBO requirements
2. **API Expansion**: Create additional endpoints for events, donations, newsletters
3. **Authentication**: Implement user authentication and authorization
4. **Data Migration**: Set up data seeding scripts for initial data
5. **Backup Strategy**: Implement regular database backups
6. **Monitoring**: Add database performance monitoring

## 🐛 Troubleshooting

### Common Issues

1. **Connection String Issues**

   - Ensure special characters in passwords are URL-encoded
   - Verify database name is correct
   - Check IP whitelist in MongoDB Atlas

2. **Environment Variables**

   - Restart development server after changing `.env.local`
   - Ensure no trailing spaces in environment variables

3. **Model Issues**
   - Check required fields are provided
   - Verify enum values match schema definitions
   - Ensure unique constraints are not violated

### Debug Commands

```bash
# Test database connection
curl http://localhost:3000/api/test-db

# Check server logs
npm run dev

# Verify environment variables
echo $MONGODB_URI
```

## 📞 Support

For additional help with MongoDB setup or model extensions, refer to:

- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
