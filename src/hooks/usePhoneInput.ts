'use client';

import { useState, useCallback } from 'react';
import { DEFAULT_COUNTRY_CODE, countryCodes, validatePhoneNumber, formatPhoneNumber, type CountryCode } from '@/utils/countryCodes';

interface UsePhoneInputProps {
  initialPhone?: string;
  initialCountryCode?: string;
}

export function usePhoneInput({ initialPhone = '', initialCountryCode = DEFAULT_COUNTRY_CODE }: UsePhoneInputProps = {}) {
  const [phone, setPhone] = useState(initialPhone);
  const [countryCode, setCountryCode] = useState(initialCountryCode);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = useCallback((newPhone: string) => {
    setPhone(newPhone);
    setError(null);
    
    if (newPhone && !validatePhoneNumber(newPhone)) {
      setError('Please enter a valid phone number');
    }
  }, []);

  const handleCountryCodeChange = useCallback((newCountryCode: string) => {
    setCountryCode(newCountryCode);
  }, []);

  const getFormattedPhone = useCallback(() => {
    return formatPhoneNumber(phone, countryCode);
  }, [phone, countryCode]);

  const validate = useCallback(() => {
    if (!phone) return true; // Optional field
    const isValid = validatePhoneNumber(phone);
    if (!isValid) {
      setError('Please enter a valid phone number');
    }
    return isValid;
  }, [phone]);

  const reset = useCallback(() => {
    setPhone('');
    setCountryCode(DEFAULT_COUNTRY_CODE);
    setError(null);
  }, []);

  return {
    phone,
    countryCode,
    error,
    handlePhoneChange,
    handleCountryCodeChange,
    getFormattedPhone,
    validate,
    reset,
    isValid: !error && (!phone || validatePhoneNumber(phone))
  };
}

export function useCountryCodes() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countryCodes.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  const findCountryByCode = useCallback((code: string): CountryCode | undefined => {
    return countryCodes.find(country => country.code === code);
  }, []);

  const findCountryByDialCode = useCallback((dialCode: string): CountryCode | undefined => {
    return countryCodes.find(country => country.dialCode === dialCode);
  }, []);

  return {
    countryCodes,
    filteredCountries,
    searchTerm,
    setSearchTerm,
    findCountryByCode,
    findCountryByDialCode,
    DEFAULT_COUNTRY_CODE
  };
}
