# Flamingo Community Organization - Comprehensive Membership Management API

## Overview

This API provides comprehensive membership management capabilities for community-based organizations, including full membership lifecycle management, application workflows, committee coordination, and audit trails.

## Core Features

- **Membership Lifecycle Management**: Application → Review → Approval → Active → Status Changes → Resignation/Expulsion
- **Application Workflow**: Submit → Review → Interview → Payment → Conversion to Member
- **Committee Management**: Create committees, assign members, track participation
- **Audit Trails**: Complete action logging and membership history
- **Status Management**: Handle suspensions, renewals, probations, and status changes
- **Financial Tracking**: Fee status, payment tracking, exemptions

## API Endpoints

### 1. Member Management

#### GET /api/members

Get all members with filtering and pagination.

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `status` (string): Filter by status (active|inactive|suspended|expelled|resigned)
- `membershipType` (string): Filter by type (ordinary|patron|honorary|student|senior|corporate)
- `membershipCategory` (string): Filter by category
- `search` (string): Search in name, email, membership number
- `committee` (string): Filter by committee membership
- `hasOutstandingFees` (boolean): Filter by fee status
- `joinDateFrom` (date): Filter by join date range
- `joinDateTo` (date): Filter by join date range

**Response:**

```json
{
  "success": true,
  "data": {
    "members": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

#### GET /api/members/{id}

Get member by ID with full details including committees and audit log.

#### PUT /api/members/{id}

Update member information.

#### DELETE /api/members/{id}

Delete member (soft delete with audit trail).

#### GET /api/members/by-membership-number/{membershipNumber}

Get member by membership number.

#### GET /api/members/stats

Get membership statistics.

**Response:**

```json
{
  "success": true,
  "data": {
    "total": 150,
    "active": 120,
    "inactive": 15,
    "suspended": 10,
    "expelled": 3,
    "resigned": 2,
    "ordinary": 100,
    "patron": 30,
    "honorary": 15,
    "corporate": 5,
    "withOutstandingFees": 25
  }
}
```

### 2. Member Status Management

#### PUT /api/members/{id}/status

Update member status with audit trail.

**Request Body:**

```json
{
  "status": "suspended",
  "substatus": "probation",
  "reason": "Violation of community guidelines",
  "adminId": "admin123",
  "adminName": "John Admin",
  "effectiveDate": "2025-01-15T00:00:00Z",
  "notes": "30-day probation period"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "member": {...},
    "action": {...}
  },
  "message": "Member status updated successfully"
}
```

### 3. Membership Applications

#### POST /api/membership/applications

Submit a new membership application.

**Request Body:**

```json
{
  "personalInfo": {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "1990-01-01",
    "gender": "female",
    "nationality": "US",
    "occupation": "Teacher"
  },
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "county": "County",
    "country": "USA"
  },
  "membershipInfo": {
    "membershipType": "ordinary",
    "membershipCategory": "individual",
    "skills": ["teaching", "communication"],
    "interests": ["education", "community"],
    "reasonForJoining": "Want to contribute to community development"
  },
  "references": [
    {
      "name": "John Smith",
      "relationship": "Colleague",
      "phone": "+1234567891",
      "email": "john.smith@example.com"
    }
  ],
  "emergencyContact": {
    "name": "Jane's Mother",
    "relationship": "Mother",
    "phone": "+1234567892"
  },
  "communicationPreferences": {
    "email": true,
    "sms": false,
    "phone": true,
    "mail": false
  }
}
```

#### GET /api/membership/applications

Get all membership applications with filtering.

**Query Parameters:**

- `page`, `limit`: Pagination
- `status`: Filter by status (pending|under_review|approved|rejected|withdrawn|expired|converted)

#### GET /api/membership/applications/{id}

Get specific application details.

#### PATCH /api/membership/applications/{id}

Review membership application.

**Request Body:**

```json
{
  "status": "approved",
  "comments": "Application meets all requirements",
  "interviewRequired": false,
  "paymentRequired": true,
  "paymentAmount": 50,
  "paymentDueDate": "2025-02-15T00:00:00Z",
  "adminId": "admin123",
  "adminName": "John Admin"
}
```

#### POST /api/membership/applications/{id}

Convert approved application to member.

**Request Body:**

```json
{
  "adminId": "admin123",
  "adminName": "John Admin"
}
```

### 4. Membership Actions & Audit Trail

#### GET /api/members/{id}/actions

Get all actions performed on a member.

**Response:**

```json
{
  "success": true,
  "data": {
    "actions": [
      {
        "id": "action123",
        "actionType": "membership_approval",
        "description": "Membership approved and member created",
        "performedBy": {
          "admin": "admin123",
          "name": "John Admin"
        },
        "effectiveDate": "2025-01-01T00:00:00Z",
        "notes": "Application processed successfully",
        "metadata": {
          "applicationId": "app123"
        },
        "createdAt": "2025-01-01T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

#### POST /api/members/{id}/actions

Create a new membership action.

**Request Body:**

```json
{
  "actionType": "warning",
  "description": "Issued warning for policy violation",
  "adminId": "admin123",
  "adminName": "John Admin",
  "effectiveDate": "2025-01-15T00:00:00Z",
  "notes": "First warning - policy review required",
  "metadata": {
    "policyViolation": "attendance",
    "warningLevel": 1
  }
}
```

### 5. Committee Management

#### GET /api/committees

Get all active committees with member information.

**Response:**

```json
{
  "success": true,
  "data": {
    "committees": [
      {
        "id": "committee123",
        "name": "Finance Committee",
        "description": "Manages organizational finances",
        "type": "standing",
        "chair": {
          "firstName": "John",
          "lastName": "Chair",
          "email": "john.chair@example.com"
        },
        "members": [
          {
            "member": {
              "firstName": "Jane",
              "lastName": "Member",
              "membershipNumber": "MEM001"
            },
            "position": "secretary",
            "joinDate": "2024-01-01T00:00:00Z",
            "isActive": true
          }
        ],
        "memberCount": 5,
        "maxMembers": 10,
        "status": "active"
      }
    ],
    "pagination": {...}
  }
}
```

#### POST /api/committees

Create a new committee.

**Request Body:**

```json
{
  "name": "Events Committee",
  "description": "Plans and coordinates community events",
  "purpose": "Organize monthly events and annual fundraising",
  "responsibilities": [
    "Event planning and coordination",
    "Vendor management",
    "Budget oversight for events"
  ],
  "chairId": "member123",
  "maxMembers": 8,
  "adminId": "admin123",
  "adminName": "John Admin"
}
```

#### POST /api/members/{id}/committees

Add member to committee.

**Request Body:**

```json
{
  "committeeId": "committee123",
  "role": "member",
  "adminId": "admin123",
  "adminName": "John Admin"
}
```

#### DELETE /api/members/{id}/committees/{committeeId}

Remove member from committee.

**Request Body:**

```json
{
  "adminId": "admin123",
  "adminName": "John Admin"
}
```

### 6. Member Activity

#### GET /api/members/{id}/activity

Get member's participation history.

**Response:**

```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "event123",
        "title": "Monthly Community Meeting",
        "date": "2025-01-15T18:00:00Z",
        "status": "attended"
      }
    ],
    "donations": [
      {
        "id": "donation123",
        "amount": 100,
        "currency": "USD",
        "purpose": "General Fund",
        "createdAt": "2025-01-10T00:00:00Z"
      }
    ],
    "committees": [
      {
        "committee": "Finance Committee",
        "position": "member",
        "joinDate": "2024-06-01T00:00:00Z",
        "status": "active"
      }
    ],
    "actions": [
      {
        "type": "fee_payment",
        "description": "Annual membership fee paid",
        "date": "2025-01-01T00:00:00Z"
      }
    ]
  }
}
```

## Action Types

The system supports the following action types for comprehensive audit tracking:

- `membership_approval`: Initial membership approval
- `activation`: Member activation
- `suspension`: Member suspension
- `reinstatement`: Reinstatement after suspension
- `expulsion`: Member expulsion
- `resignation`: Member resignation
- `renewal`: Membership renewal
- `fee_payment`: Fee payment recording
- `warning`: Disciplinary warning
- `probation`: Probationary status
- `status_change`: General status changes
- `committee_assignment`: Committee assignment
- `committee_removal`: Committee removal
- `other`: Other administrative actions

## Member Status Values

### Primary Status

- `pending`: Application submitted, awaiting review
- `approved`: Application approved, awaiting conversion
- `active`: Active member in good standing
- `inactive`: Inactive member (non-participating)
- `suspended`: Temporarily suspended
- `expelled`: Permanently expelled
- `resigned`: Voluntarily resigned
- `deceased`: Deceased member

### Sub-Status

- `probation`: Under probationary period
- `grace-period`: In grace period for renewal
- `renewal-due`: Renewal required
- `payment-overdue`: Payment overdue

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "error": "Member not found",
  "message": "No member found with this ID"
}
```

Common HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Security & Authentication

All administrative endpoints require proper authentication and authorization. The system maintains detailed audit logs of all actions performed by administrators.

## Database Models

The system uses comprehensive MongoDB models:

- **Member**: Complete member profile with lifecycle management
- **MembershipApplication**: Application workflow and review process
- **MembershipAction**: Audit trail and action logging
- **Committee**: Committee structure and member assignments
- **Admin**: Administrative user management
- **Organization**: Organization-wide settings and configuration

## Usage Examples

### Complete Membership Workflow

1. **Application Submission**: User submits application via POST to `/api/membership/applications`
2. **Review Process**: Admin reviews via PATCH to `/api/membership/applications/{id}`
3. **Approval**: Admin approves via POST to `/api/membership/applications/{id}`
4. **Member Creation**: System automatically creates member with proper status
5. **Committee Assignment**: Admin assigns to committees via POST to `/api/members/{id}/committees`
6. **Status Management**: Handle status changes via PUT to `/api/members/{id}/status`
7. **Audit Trail**: View complete history via GET to `/api/members/{id}/actions`

This comprehensive API provides all the tools needed for professional membership management in community-based organizations.
