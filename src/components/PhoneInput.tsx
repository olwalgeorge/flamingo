'use client';

import { useState } from 'react';
import { countryCodes, DEFAULT_COUNTRY_CODE, validatePhoneNumber, type CountryCode } from '@/utils/countryCodes';

interface PhoneInputProps {
  value?: string;
  countryCode?: string;
  onPhoneChange: (phone: string) => void;
  onCountryCodeChange: (countryCode: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  id?: string;
  className?: string;
  compact?: boolean; // Show only flag, no country code text
}

export default function PhoneInput({
  value = '',
  countryCode = DEFAULT_COUNTRY_CODE,
  onPhoneChange,
  onCountryCodeChange,
  placeholder = '712345678',
  required = false,
  disabled = false,
  error,
  label,
  id,
  className = '',
  compact = false
}: PhoneInputProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countryCodes.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  const selectedCountry = countryCodes.find(country => country.dialCode === countryCode);

  const handleCountrySelect = (country: CountryCode) => {
    onCountryCodeChange(country.dialCode);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    onPhoneChange(phoneValue);
  };

  const isValid = !error && (!value || validatePhoneNumber(value));
  const inputClassName = `
    flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg 
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${error ? 'border-red-300 focus:ring-red-500' : ''}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  const selectClassName = `
    relative ${compact ? 'w-16' : 'w-28 sm:w-32'} px-3 py-3 border border-gray-300 rounded-l-lg 
    focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50
    ${error ? 'border-red-300 focus:ring-red-500' : ''}
    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100'}
  `.trim();

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div className="flex">
          {/* Country Code Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
              disabled={disabled}
              className={selectClassName}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              title={compact ? `${selectedCountry?.name || 'Unknown'} (${countryCode})` : undefined}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <span className="text-lg">{selectedCountry?.flag || '🏳️'}</span>
                  {!compact && <span className="text-sm hidden sm:inline">{countryCode}</span>}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Dropdown */}
            {isDropdownOpen && !disabled && (
              <div className="absolute z-50 w-80 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
                {/* Search */}
                <div className="p-3 border-b border-gray-200">
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Country List */}
                <div className="max-h-40 overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center space-x-3 ${
                        country.dialCode === countryCode ? 'bg-blue-50 text-blue-700' : ''
                      }`}
                    >
                      <span className="text-lg flex-shrink-0">{country.flag}</span>
                      <span className="flex-1 truncate">{country.name}</span>
                      <span className="text-gray-500 text-sm flex-shrink-0">{country.dialCode}</span>
                    </button>
                  ))}
                  
                  {filteredCountries.length === 0 && (
                    <div className="px-4 py-3 text-gray-500 text-center">
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <input
            type="tel"
            id={id}
            value={value}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={inputClassName}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        </div>

        {/* Click overlay to close dropdown */}
        {isDropdownOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Validation Hint */}
      {!error && value && !isValid && (
        <p className="text-sm text-amber-600">
          Please enter a valid phone number
        </p>
      )}
    </div>
  );
}
