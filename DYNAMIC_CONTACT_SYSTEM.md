# Dynamic Contact Information System

This system provides centralized, dynamic contact information for FLAMINGO CHAP CHAP CBO throughout the entire application.

## 🌟 Features

- **Centralized Data**: All contact information managed from a single source
- **Dynamic Updates**: Changes propagate automatically across all pages
- **Reusable Components**: Contact cards for different use cases
- **React Hooks**: Easy access to contact data in any component
- **TypeScript Support**: Full type safety for all contact data

## 📂 File Structure

```
src/
├── data/contactInfo.ts           # Central contact data store
├── components/ContactCard.tsx    # Reusable contact display component
├── hooks/useContactInfo.ts       # React hooks for contact data access
└── app/
    ├── contact/page.tsx         # Enhanced contact page
    ├── about/page.tsx           # About page with leadership contacts
    ├── volunteer/page.tsx       # Volunteer page with compact contact
    ├── support/page.tsx         # Support page with contact info
    └── api/chat/route.ts        # Chat API using dynamic contact data
```

## 🚀 Quick Usage

### Basic Contact Information

```tsx
import { CONTACT_INFO } from "@/data/contactInfo";

function MyComponent() {
  return (
    <div>
      <p>Phone: {CONTACT_INFO.primaryContact.phone}</p>
      <p>Email: {CONTACT_INFO.primaryContact.email}</p>
      <p>Address: {CONTACT_INFO.office.address}</p>
    </div>
  );
}
```

### Using React Hooks

```tsx
import {
  useContactInfo,
  useMainContact,
  useOfficeStatus,
} from "@/hooks/useContactInfo";

function ContactComponent() {
  const { contactInfo, getMainPhone, getMainEmail } = useContactInfo();
  const { phone, email } = useMainContact();
  const { isOpen, businessHours } = useOfficeStatus();

  return (
    <div>
      <p>
        Call us: <a href={`tel:${phone}`}>{phone}</a>
      </p>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>Office Status: {isOpen ? "Open" : "Closed"}</p>
    </div>
  );
}
```

### Contact Card Component

```tsx
import ContactCard from "@/components/ContactCard";

function PageWithContact() {
  return (
    <div>
      <h1>Contact Us</h1>

      {/* Detailed contact card */}
      <ContactCard
        variant="detailed"
        showBusinessHours={true}
        showLeadership={true}
        showDepartments={true}
      />

      {/* Compact contact card */}
      <ContactCard variant="compact" showBusinessHours={false} />
    </div>
  );
}
```

## 📋 Available Contact Data

### Organization Information

- Name: FLAMINGO CHAP CHAP CBO
- Full Name: FLAMINGO Community-Based Organization
- Acronym: FCC CBO

### Primary Contact

- Phone: +254722113087
- Email: info@flamingochapchap.org
- Alternative Phone: +254700123456

### Department Emails

- General: info@flamingochapchap.org
- Events: events@flamingochapchap.org
- Volunteer: volunteer@flamingochapchap.org
- Membership: membership@flamingochapchap.org
- Finance: finance@flamingochapchap.org

### Leadership Team

- **Samuel Weswa Khaukha** - Chairman
- **George Omondi Olwal** - General Secretary
- **Len Chelimo Koskei** - Treasurer

### Office Location

- Address: Flamingo Unit, Kondele Ward
- Postal: P.O Box 2340-40100
- City: Kisumu
- County: Kisumu County
- Country: Kenya

### Business Hours

- Monday-Friday: 9:00 AM - 5:00 PM
- Saturday: 10:00 AM - 2:00 PM
- Sunday: Closed

### Service Areas

- Kondele Ward
- Kisumu Central
- River Kibos Watershed
- River Auji Basin

## 🛠️ Utility Functions

### Available Functions

```typescript
// Get formatted phone number
getMainContactPhone(): string

// Get main email address
getMainContactEmail(): string

// Get formatted address
getFormattedAddress(): string

// Get business hours array
getFormattedBusinessHours(): { day: string; hours: string }[]

// Check if office is currently open
isOfficeOpen(): boolean

// Get specific leader by position
getLeadershipByPosition(position: string): ContactPerson | undefined

// Get department email
getDepartmentEmail(department: string): string

// Get business hours for specific day
getBusinessHoursForDay(day: string): string
```

## 📍 Where It's Used

### Pages with Dynamic Contact Info

- **Contact Page** (`/contact`) - Full contact card with departments
- **About Page** (`/about`) - Leadership team contact details
- **Volunteer Page** (`/volunteer`) - Compact contact for questions
- **Support Page** (`/support`) - Contact info for customer support
- **Footer** (All pages) - Basic contact information

### Components Updated

- **Footer.tsx** - Uses dynamic organization name and contact
- **ContactCard.tsx** - Reusable contact display component
- **Chat API** - Uses dynamic contact data for AI responses

## 🔄 Making Updates

To update contact information:

1. **Edit the central data file:**

   ```typescript
   // src/data/contactInfo.ts
   export const CONTACT_INFO: ContactInfo = {
     primaryContact: {
       phone: "+254722113087", // Update phone here
       email: "info@flamingochapchap.org", // Update email here
       // ... other fields
     },
     // ... rest of the configuration
   };
   ```

2. **Changes automatically propagate to:**
   - All contact cards
   - Footer information
   - Chat bot responses
   - Any component using the hooks

## 🎨 Customization

### Contact Card Variants

- **`default`** - Standard contact card with main info
- **`compact`** - Minimal contact info for sidebars
- **`detailed`** - Full contact information with all options

### Display Options

- `showLeadership` - Show leadership team contacts
- `showBusinessHours` - Display office hours
- `showDepartments` - Show department email addresses

## 🚀 Integration Examples

### Adding Contact to New Page

```tsx
import ContactCard from "@/components/ContactCard";

export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>

      {/* Add contact information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <ContactCard variant="default" showBusinessHours={true} />
        </div>
      </section>
    </div>
  );
}
```

### Using Contact Data in API Routes

```typescript
import { CONTACT_INFO } from "@/data/contactInfo";

export async function POST(request: Request) {
  // Use contact data in API responses
  const response = {
    organization: CONTACT_INFO.organization.name,
    contact: CONTACT_INFO.primaryContact.email,
    // ... rest of API logic
  };

  return Response.json(response);
}
```

## 🎯 Benefits

1. **Consistency** - Same contact info across all pages
2. **Maintainability** - Update once, change everywhere
3. **Reusability** - Contact components work anywhere
4. **Type Safety** - Full TypeScript support
5. **Flexibility** - Multiple display options and hooks
6. **Performance** - Cached data and memoized hooks

The system ensures that FLAMINGO CHAP CHAP CBO's contact information is always accurate, up-to-date, and consistently displayed across the entire application.
