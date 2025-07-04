# 🔐 Admin Security & Profile Management Guide

## 🎯 Overview

This guide covers the enhanced security features and profile management system for the Flamingo CBO admin panel.

## 🔑 First-Time Login Security

### Mandatory Password Change

- **All new admin accounts require password change on first login**
- **Default passwords are temporary and must be changed immediately**
- **The system enforces strong password requirements**

### Password Requirements

- **Minimum 8 characters**
- **At least one uppercase letter (A-Z)**
- **At least one lowercase letter (a-z)**
- **At least one number (0-9)**
- **At least one special character (@$!%\*?&)**

### First Login Process

1. **Initial Login**:

   - Use temporary credentials provided during setup
   - Enter email/username and temporary password
   - System automatically redirects to password change page

2. **Password Change**:

   - Enter new password following security requirements
   - Confirm new password
   - System validates password strength in real-time
   - Password change generates new secure session token

3. **Dashboard Access**:
   - After successful password change, access full admin dashboard
   - Session remains active for 8 hours
   - Secure authentication for all admin features

## 👤 Admin Profile Management

### Accessing Your Profile

1. **From Admin Dashboard**:
   - Click on your name in the top-right corner
   - Select "Profile" from the user menu
   - Or navigate directly to `/admin-panel-fcc-2025/profile`

### Profile Information

#### Personal Details

- First Name and Last Name
- Email Address (read-only)
- Phone Number with country code
- Department and Job Title
- Professional Bio

#### System Information

- Username (read-only)
- Role and Permissions (read-only)
- Last Login Date
- Account Status

#### Editable Fields

- Personal contact information
- Department (if permitted)
- Job title
- Bio/description
- Notification preferences

### Profile Management Features

#### 🔧 Edit Profile

1. Click "Edit" button on profile page
2. Update desired fields
3. Save changes to update profile
4. Changes are validated and saved securely

#### 🔐 Change Password

1. Click "Change Password" from profile or dashboard
2. Enter current password (not required for first-time change)
3. Set new password with strength validation
4. Confirm new password
5. System updates authentication and generates new session

#### 🛡️ Security Features

- **Password Strength Indicator**: Real-time validation
- **Session Management**: Secure token handling
- **Audit Logging**: All profile changes are logged
- **Permission Validation**: Role-based access control

## 🚀 Navigation

### Admin Panel Routes

- **Dashboard**: `/admin-panel-fcc-2025`
- **Profile**: `/admin-panel-fcc-2025/profile`
- **Change Password**: `/admin-panel-fcc-2025/change-password`
- **Login**: `/admin-panel-fcc-2025/login`

### Quick Access

- **Profile Link**: Click your name in dashboard header
- **Password Change**: Available from profile page or dashboard
- **Logout**: Available from dashboard header

## 🔒 Security Best Practices

### For Administrators

1. **Strong Passwords**:

   - Use unique, complex passwords
   - Change passwords regularly
   - Don't share login credentials

2. **Session Management**:

   - Log out when finished
   - Don't leave sessions unattended
   - Use secure networks for access

3. **Profile Security**:
   - Keep profile information updated
   - Review login history regularly
   - Report suspicious activity

### System Security

1. **Account Protection**:

   - Automatic account lockout after 5 failed attempts
   - 2-hour lockout period for security
   - Secure password hashing with bcrypt

2. **Session Security**:

   - JWT tokens with 8-hour expiration
   - HTTP-only cookies for token storage
   - Secure token validation

3. **Data Protection**:
   - All sensitive data encrypted
   - Secure API endpoints
   - Role-based access control

## 🆘 Troubleshooting

### Common Issues

#### Account Locked

- **Cause**: 5 failed login attempts
- **Solution**: Wait 2 hours or contact system administrator
- **Prevention**: Use correct credentials and secure password

#### Password Reset

- **Current System**: Manual password change via profile
- **Access**: Must be logged in to change password
- **Help**: Contact system administrator if locked out

#### Profile Updates

- **Validation Errors**: Check required fields and formats
- **Permission Errors**: Some fields may be read-only based on role
- **Save Issues**: Ensure all required information is provided

### Support

For technical issues or account problems:

- Contact system administrator
- Email: admin@flamingocbo.org
- Phone: +254734567890

## 📊 System Status

### Current Features

- ✅ Mandatory password change on first login
- ✅ Strong password requirements
- ✅ Admin profile management
- ✅ Secure session handling
- ✅ Account lockout protection
- ✅ Profile editing with validation
- ✅ Password change with strength validation

### Security Compliance

- ✅ Password encryption (bcrypt)
- ✅ Session tokens (JWT)
- ✅ HTTP-only cookies
- ✅ Role-based access control
- ✅ Audit logging
- ✅ Account lockout protection

---

**Last Updated**: July 2025  
**Version**: 1.0  
**System**: Flamingo CBO Management Platform
