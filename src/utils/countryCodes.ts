// Universal country codes utility for international phone number support

export interface CountryCode {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export const countryCodes: CountryCode[] = [
  // East African Countries (Priority)
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
  { code: 'UG', name: 'Uganda', dialCode: '+256', flag: '🇺🇬' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255', flag: '🇹🇿' },
  { code: 'RW', name: 'Rwanda', dialCode: '+250', flag: '🇷🇼' },
  { code: 'ET', name: 'Ethiopia', dialCode: '+251', flag: '🇪🇹' },
  { code: 'BI', name: 'Burundi', dialCode: '+257', flag: '🇧🇮' },
  { code: 'DJ', name: 'Djibouti', dialCode: '+253', flag: '🇩🇯' },
  { code: 'SO', name: 'Somalia', dialCode: '+252', flag: '🇸🇴' },
  { code: 'SS', name: 'South Sudan', dialCode: '+211', flag: '🇸🇸' },
  
  // Other African Countries
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
  { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦' },
  { code: 'DZ', name: 'Algeria', dialCode: '+213', flag: '🇩🇿' },
  { code: 'TN', name: 'Tunisia', dialCode: '+216', flag: '🇹🇳' },
  { code: 'LY', name: 'Libya', dialCode: '+218', flag: '🇱🇾' },
  { code: 'SD', name: 'Sudan', dialCode: '+249', flag: '🇸🇩' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: '🇿🇼' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260', flag: '🇿🇲' },
  { code: 'MW', name: 'Malawi', dialCode: '+265', flag: '🇲🇼' },
  { code: 'MZ', name: 'Mozambique', dialCode: '+258', flag: '🇲🇿' },
  { code: 'BW', name: 'Botswana', dialCode: '+267', flag: '🇧🇼' },
  { code: 'NA', name: 'Namibia', dialCode: '+264', flag: '🇳🇦' },
  
  // Major International Countries
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹' },
  { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻' },
  { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪' }
];

// Default country code for the organization (Kenya)
export const DEFAULT_COUNTRY_CODE = '+254';
export const DEFAULT_COUNTRY = 'KE';

// Utility functions
export function getCountryByCode(code: string): CountryCode | undefined {
  return countryCodes.find(country => country.code === code);
}

export function getCountryByDialCode(dialCode: string): CountryCode | undefined {
  return countryCodes.find(country => country.dialCode === dialCode);
}

export function formatPhoneNumber(phoneNumber: string, countryCode: string): string {
  if (!phoneNumber || !countryCode) return '';
  
  // Remove any existing country code from the phone number
  const cleanNumber = phoneNumber.replace(/^\+?[\d\s\-\(\)]+/, '').trim();
  
  // Return formatted number with country code
  return `${countryCode} ${cleanNumber}`;
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  if (!phoneNumber) return false;
  
  // Basic phone number validation
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  const isValidFormat = phoneRegex.test(phoneNumber);
  const hasMinLength = phoneNumber.replace(/\D/g, '').length >= 7;
  const hasMaxLength = phoneNumber.replace(/\D/g, '').length <= 15;
  
  return isValidFormat && hasMinLength && hasMaxLength;
}

export function getEastAfricanCountries(): CountryCode[] {
  const eastAfricanCodes = ['KE', 'UG', 'TZ', 'RW', 'ET', 'BI', 'DJ', 'SO', 'SS'];
  return countryCodes.filter(country => eastAfricanCodes.includes(country.code));
}

export function getAfricanCountries(): CountryCode[] {
  const africanCodes = [
    'KE', 'UG', 'TZ', 'RW', 'ET', 'BI', 'DJ', 'SO', 'SS', 'ZA', 'NG', 'GH', 
    'EG', 'MA', 'DZ', 'TN', 'LY', 'SD', 'ZW', 'ZM', 'MW', 'MZ', 'BW', 'NA'
  ];
  return countryCodes.filter(country => africanCodes.includes(country.code));
}

export function searchCountries(query: string): CountryCode[] {
  const searchTerm = query.toLowerCase();
  return countryCodes.filter(country => 
    country.name.toLowerCase().includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm) ||
    country.dialCode.includes(searchTerm)
  );
}
