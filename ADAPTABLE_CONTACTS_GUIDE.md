# Adaptable Department Contacts - Usage Examples

The enhanced department contact system allows for flexible, context-aware display of contact information with detailed descriptions and responsibilities.

## 🎯 Enhanced Features

### Department Contact Structure

Each department now includes:

- **Email address** - Direct contact email
- **Description** - Clear explanation of what the department handles
- **Responsibilities** - Specific services and tasks they manage

### Available Departments

1. **General** - General inquiries & information
2. **Events** - Events & activities coordination
3. **Volunteer** - Volunteer opportunities & management
4. **Membership** - Membership services & support
5. **Finance** - Financial services & donations

## 🚀 Usage Examples

### 1. Detailed Department Cards (Contact Page)

```tsx
import { DepartmentContacts } from "@/components/DepartmentContact";

<DepartmentContacts
  variant="detailed"
  showDescription={true}
  showResponsibilities={true}
  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
/>;
```

### 2. Single Department Display

```tsx
import DepartmentContactComponent from "@/components/DepartmentContact";

<DepartmentContactComponent
  department="volunteer"
  variant="detailed"
  showDescription={true}
  showResponsibilities={true}
/>;
```

### 3. Compact Inline Display

```tsx
<DepartmentContactComponent
  department="events"
  variant="inline"
  showDescription={false}
  showResponsibilities={false}
/>
```

### 4. Specific Departments Only

```tsx
<DepartmentContacts
  variant="card"
  departments={["volunteer", "events"]}
  showDescription={true}
  showResponsibilities={true}
/>
```

### 5. Using the Hook for Custom Components

```tsx
import { useDepartmentInfo } from "@/hooks/useContactInfo";

function CustomVolunteerContact() {
  const volunteerInfo = useDepartmentInfo("volunteer");

  return (
    <div>
      <h3>Volunteer with Us!</h3>
      <p>{volunteerInfo.description}</p>
      <a href={`mailto:${volunteerInfo.email}`}>
        Contact: {volunteerInfo.email}
      </a>
      <ul>
        {volunteerInfo.responsibleFor.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 📱 Display Variants

### Detailed Variant

- Full department cards with icons
- Complete descriptions
- All responsibilities listed
- Perfect for dedicated contact pages

### Card Variant

- Compact cards with essential info
- Abbreviated responsibilities (shows first 3)
- Good for sidebars and sections

### Inline Variant

- Single line display
- Just department name and email
- Ideal for footers and minimal displays

## 🎨 Responsive Design

The department contacts are fully responsive:

- **Mobile**: Single column layout
- **Tablet**: Responsive grid
- **Desktop**: Multi-column layouts

## 🔧 Customization Options

### Show/Hide Elements

- `showDescription`: Toggle department descriptions
- `showResponsibilities`: Toggle responsibility tags
- `departments`: Filter to specific departments only

### Styling

- `className`: Add custom CSS classes
- Built-in responsive grid support
- Consistent with design system

## 💡 Best Practices

### When to Use Each Variant

- **Detailed**: Main contact pages, department showcases
- **Card**: Contact sections, help pages
- **Inline**: Footers, quick references

### Context-Specific Usage

- **Volunteer Pages**: Show volunteer department prominently
- **Event Pages**: Highlight events department
- **Donation Pages**: Feature finance department
- **General Pages**: Show all departments equally

The system automatically adapts the contact information display to match the parent context and user needs!
