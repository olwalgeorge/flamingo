# 🔐 Admin Panel Access Guide

## 🎯 Quick Access

**Admin Panel URL**: [http://localhost:3000/admin-panel-fcc-2025](http://localhost:3000/admin-panel-fcc-2025)

## 🔑 First-Time Login

### Default Super Admin Account

- **Email**: `admin@flamingocbo.org`
- **Username**: `georgeolwal` (you can use either email or username)
- **Role**: Super Admin
- **Department**: Administration
- **Title**: Executive Director

### 🔐 Security Note

**The default password is provided during the database seeding process and must be changed on first login.**

For security reasons, default login credentials are not displayed here. The system requires:

1. Password change on first login
2. Strong password requirements (8+ characters, uppercase, lowercase, number, special character)
3. Account lockout protection after 5 failed attempts

## 🚀 Access Instructions

1. **Navigate to Admin Panel**:

   - Visit: http://localhost:3000/admin-panel-fcc-2025
   - You'll be automatically redirected to the login page

2. **First Login Process**:

   - Enter either email (`admin@flamingocbo.org`) or username (`georgeolwal`)
   - Enter the temporary password (provided during seeding)
   - You'll be redirected to set a new secure password

3. **After Password Change**:
   - You'll be redirected to the main admin dashboard
   - Your name and role will appear in the top-right corner
   - Full access to all CBO management features

## 🛡️ Security Features

### Account Protection

- **Mandatory Password Change**: First login requires password change
- **Strong Password Policy**: 8+ characters with uppercase, lowercase, number, and special character
- **Account Lockout**: 5 failed login attempts locks account for 2 hours
- **Secure Sessions**: JWT tokens with 8-hour expiration
- **Password Hashing**: Bcrypt with 12 salt rounds
- **HTTP-Only Cookies**: Secure token storage

### Permissions System

The super admin has full permissions across all modules:

- **Members**: Create, Read, Update, Delete, Approve
- **Events**: Create, Read, Update, Delete, Publish
- **Donations**: Create, Read, Update, Delete
- **Newsletter**: Create, Read, Update, Delete, Publish
- **Contacts**: Create, Read, Update, Delete
- **Settings**: Create, Read, Update, Delete
- **Reports**: Create, Read, Update, Delete
- **Users**: Create, Read, Update, Delete

## 🔄 Session Management

### Logout

- Click the logout icon (↗️) in the top-right corner
- Or visit: http://localhost:3000/api/admin/logout

### Session Expiry

- Sessions automatically expire after 8 hours
- You'll be redirected to login when session expires

## ⚠️ Important Security Notes

### Change Default Password

**🚨 CRITICAL**: Change the default password immediately after first login!

### Production Security

For production deployment:

1. Change the JWT secret in `.env.local`
2. Update default admin credentials
3. Enable HTTPS
4. Configure secure cookie settings
5. Set up proper backup procedures

## 🧪 API Testing

You can test the authentication API directly:

```bash
# Login
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@flamingocbo.org","password":"SecureAdmin@2025"}'

# Logout
curl -X POST http://localhost:3000/api/admin/logout
```

## 🔧 Admin Dashboard Features

Once logged in, you have access to:

### Dashboard Overview

- Real-time statistics
- Recent activities
- Quick action buttons
- System status monitoring

### Management Sections

- **Events Management**: Create, edit, and monitor events
- **Members Management**: Member registration and profiles
- **Financial Management**: Donations and budget tracking
- **Communications**: Newsletter and announcements
- **Chat Sessions**: Customer support monitoring

### Quick Actions

- Add new events
- Register new members
- Send newsletters
- Generate reports
- Manage settings

## 🆘 Troubleshooting

### Cannot Access Admin Panel

1. Ensure the development server is running: `npm run dev`
2. Check the URL: http://localhost:3000/admin-panel-fcc-2025
3. Clear browser cache and cookies

### Login Issues

1. **Wrong Credentials**: Use exact credentials above
2. **Account Locked**: Wait 2 hours or reset the database
3. **Session Expired**: Simply login again

### Reset Admin Account

If you need to reset the admin account:

```bash
npm run seed  # This will recreate the default admin
```

## 📞 Support

For technical support with the admin panel:

1. Check the browser console for error messages
2. Verify the database connection: `npm run verify`
3. Restart the development server: `npm run dev`
4. Review the server logs in the terminal

---

**🎉 Your admin panel is ready to use!**

The system provides comprehensive CBO management capabilities with enterprise-level security features.
