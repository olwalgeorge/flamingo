# Universal Country Codes & Phone Input System

This system provides comprehensive international phone number support throughout the application with a focus on user-friendly flag-based country selection.

## 🌍 Features

- **Flag-First Design**: Beautiful flag icons prominently displayed instead of country codes
- **50+ Countries**: Comprehensive country list with East African priority
- **Smart Search**: Real-time country search by name, code, or dial code
- **Validation**: Automatic phone number validation
- **Responsive**: Works perfectly on mobile and desktop
- **Accessible**: Full ARIA support and keyboard navigation
- **TypeScript**: Complete type safety

## 📂 File Structure

```
src/
├── utils/countryCodes.ts          # Core country data and utilities
├── components/PhoneInput.tsx      # Universal phone input component
├── hooks/usePhoneInput.ts         # React hooks for phone input management
└── app/
    ├── volunteer/apply/[id]/      # Volunteer application (compact flags)
    └── contact/                   # Contact form (full display)
```

## 🚀 Usage

### Basic Phone Input

```tsx
import PhoneInput from "@/components/PhoneInput";

function MyForm() {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+254");

  return (
    <PhoneInput
      value={phone}
      countryCode={countryCode}
      onPhoneChange={setPhone}
      onCountryCodeChange={setCountryCode}
      label="Phone Number"
      required
    />
  );
}
```

### Compact Flag Display

```tsx
<PhoneInput
  value={phone}
  countryCode={countryCode}
  onPhoneChange={setPhone}
  onCountryCodeChange={setCountryCode}
  compact={true} // Shows only flag + dropdown arrow
  required
/>
```

### Using Custom Hooks

```tsx
import { usePhoneInput } from "@/hooks/usePhoneInput";

function MyForm() {
  const {
    phone,
    countryCode,
    handlePhoneChange,
    handleCountryCodeChange,
    isValid,
    getFormattedPhone,
  } = usePhoneInput({
    initialCountryCode: "+254",
  });

  return (
    <PhoneInput
      value={phone}
      countryCode={countryCode}
      onPhoneChange={handlePhoneChange}
      onCountryCodeChange={handleCountryCodeChange}
      error={!isValid ? "Invalid phone number" : undefined}
    />
  );
}
```

### Utility Functions

```tsx
import {
  formatPhoneNumber,
  validatePhoneNumber,
  getCountryByDialCode,
  getEastAfricanCountries,
} from "@/utils/countryCodes";

// Format phone with country code
const formatted = formatPhoneNumber("712345678", "+254");
// Result: "+254 712345678"

// Validate phone number
const isValid = validatePhoneNumber("712345678");

// Get country by dial code
const kenya = getCountryByDialCode("+254");
// Result: { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' }

// Get regional countries
const eastAfrican = getEastAfricanCountries();
```

## 🎨 Display Modes

### Compact Mode (`compact={true}`)

- Shows only the flag icon
- Ideal for forms with limited space
- Tooltip shows country name on hover
- Used in volunteer application forms

### Full Mode (`compact={false}`)

- Shows flag + country code text
- Better for important forms
- More informative display
- Used in contact forms

## 🌍 Supported Countries

### East African Priority (Top of List)

- 🇰🇪 Kenya (+254) - Default
- 🇺🇬 Uganda (+256)
- 🇹🇿 Tanzania (+255)
- 🇷🇼 Rwanda (+250)
- 🇪🇹 Ethiopia (+251)
- 🇧🇮 Burundi (+257)
- 🇩🇯 Djibouti (+253)
- 🇸🇴 Somalia (+252)
- 🇸🇸 South Sudan (+211)

### Other African Countries

- 🇿🇦 South Africa, 🇳🇬 Nigeria, 🇬🇭 Ghana, 🇪🇬 Egypt, etc.

### Major International Countries

- 🇺🇸 United States, 🇬🇧 United Kingdom, 🇨🇦 Canada, 🇦🇺 Australia, etc.

## ⚙️ Configuration

### Default Settings

```tsx
// Default country (Kenya)
export const DEFAULT_COUNTRY_CODE = "+254";
export const DEFAULT_COUNTRY = "KE";
```

### Customization Options

```tsx
interface PhoneInputProps {
  value?: string;
  countryCode?: string;
  onPhoneChange: (phone: string) => void;
  onCountryCodeChange: (countryCode: string) => void;
  placeholder?: string; // Default: "712345678"
  required?: boolean; // Default: false
  disabled?: boolean; // Default: false
  error?: string; // Error message to display
  label?: string; // Field label
  id?: string; // HTML ID
  className?: string; // Additional CSS classes
  compact?: boolean; // Flag-only display
}
```

## 🔍 Search Functionality

The dropdown includes real-time search that matches:

- Country names (e.g., "Kenya", "United States")
- Country codes (e.g., "KE", "US")
- Dial codes (e.g., "+254", "+1")

## ✅ Validation

Automatic validation includes:

- Minimum length (7 digits)
- Maximum length (15 digits)
- Valid characters (numbers, spaces, hyphens, parentheses)
- Real-time error feedback

## 📱 Mobile Support

- Touch-friendly dropdown
- Large touch targets
- Responsive flag display
- Smooth animations

## ♿ Accessibility

- Full ARIA support
- Keyboard navigation
- Screen reader friendly
- Proper focus management
- High contrast support

## 🛠️ Integration Examples

### Volunteer Application Form

```tsx
// Compact mode for space efficiency
<PhoneInput
  id="phone"
  value={formData.phone}
  countryCode={formData.phoneCountryCode}
  onPhoneChange={(phone) => handleInputChange("phone", phone)}
  onCountryCodeChange={(code) => handleInputChange("phoneCountryCode", code)}
  compact={true}
  required
/>
```

### Contact Form

```tsx
// Full mode for clarity
<PhoneInput
  id="phone"
  label="Phone Number (Optional)"
  value={formData.phone}
  countryCode={formData.phoneCountryCode}
  onPhoneChange={handlePhoneChange}
  onCountryCodeChange={handleCountryCodeChange}
  compact={false}
/>
```

This system ensures consistent, professional phone number handling across the entire application with beautiful flag-based country selection.
