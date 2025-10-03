'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';

const LanguageSelector: React.FC = () => {
  // TODO: Implémenter le hook useLanguage
  const currentLang = 'fr';
  const supportedLanguages = {
    fr: { name: 'Français', flag: '🇫🇷' },
    en: { name: 'English', flag: '🇬🇧' },
    es: { name: 'Español', flag: '🇪🇸' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    it: { name: 'Italiano', flag: '🇮🇹' },
  };

  const changeLanguage = (_code: string): void => {
    // TODO: Implémenter le changement de langue
    // TODO: Implement language change logging
  };

  const getLanguageFlag = (code: string): void => {
    return supportedLanguages[code as keyof typeof supportedLanguages]?.flag || '🇫🇷';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="text-base">{getLanguageFlag(currentLang)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {Object.entries(supportedLanguages).map(([code, { name, flag }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            className={`cursor-pointer ${currentLang === code ? 'bg-muted' : ''}`}
          >
            <span className="mr-3 text-base">{flag}</span>
            <span>{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
