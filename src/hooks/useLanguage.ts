'use client';

import { useEffect, useState } from 'react';

const supportedLanguages = {
  fr: { name: 'Français', flag: '🇫🇷' },
  en: { name: 'English', flag: '🇬🇧' },
  es: { name: 'Español', flag: '🇪🇸' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  it: { name: 'Italiano', flag: '🇮🇹' },
};

export const useLanguage = (): {
  changeLanguage: (language: string) => void;
  getCurrentLanguage: () => string;
  getSupportedLanguages: () => Record<string, { name: string; flag: string }>;
  getLanguageFlag: (langCode: string) => string;
  getLanguageName: (langCode: string) => string;
  currentLanguage: string;
  isRTL: boolean;
} => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && supportedLanguages[savedLanguage as keyof typeof supportedLanguages]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: string): void => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
    // Reload page to apply language change
    window.location.reload();
  };

  const getCurrentLanguage = (): string => {
    return currentLanguage;
  };

  const getSupportedLanguages = (): Record<string, { name: string; flag: string }> => {
    return supportedLanguages;
  };

  const getLanguageFlag = (langCode: string): string => {
    return supportedLanguages[langCode as keyof typeof supportedLanguages]?.flag || '🌐';
  };

  const getLanguageName = (langCode: string): string => {
    return supportedLanguages[langCode as keyof typeof supportedLanguages]?.name || langCode;
  };

  return {
    changeLanguage,
    getCurrentLanguage,
    getSupportedLanguages,
    getLanguageFlag,
    getLanguageName,
    currentLanguage,
    isRTL: false, // European languages are LTR
  };
};
