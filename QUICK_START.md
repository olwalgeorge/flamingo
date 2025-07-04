# 🚀 Quick Start: Company & Admin Setup

## One-Command Setup

Run this single command to set up your Flamingo CBO database with company details and admin user:

```bash
npm run seed
```

## Verify Setup

Check that everything was created correctly:

```bash
npm run verify
```

## 🔐 Default Admin Login

After running the seed script, you can login with:

- **Email**: admin@flamingocbo.org
- **Username**: georgeolwal
- **Password**: SecureAdmin@2025
- **Role**: Super Admin

## 🏢 What Gets Created

### Organization Profile

- Complete company information (Flamingo CBO)
- Contact details and addresses
- Banking and M-Pesa payment information
- Social media links
- Operating hours and services

### Admin User

- Super admin with full permissions
- Secure password hashing
- Complete profile with employment details

### Department Contacts

- Administration (George Olwal)
- Programs (Sarah Wanjiku)
- Finance (James Kimani)
- Communications (Mary Achieng)

## 🔄 Reset Data

To reset and recreate all data:

```bash
npm run seed:reset
```

## ⚠️ Important Security Note

**Change the default admin password immediately after first login!**

The default password `SecureAdmin@2025` should only be used for initial setup.

---

For detailed documentation, see [DATABASE_SEEDING_GUIDE.md](./DATABASE_SEEDING_GUIDE.md)
