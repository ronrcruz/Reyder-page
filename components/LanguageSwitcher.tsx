'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { i18n, Locale } from '@/lib/i18n'; // Assuming i18n.ts is in lib
import { useTranslation } from '@/lib/i18n-client'; // Assuming i18n-client.ts is in lib
import { ChevronDownIcon } from 'lucide-react'; // Using lucide-react for a consistent icon

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to extract current locale from pathname
  const getCurrentLocale = (): Locale => {
    if (!pathname) return i18n.defaultLocale as Locale;
    const segments = pathname.split('/');
    const localeSegment = segments[1];
    return i18n.locales.includes(localeSegment as Locale) ? (localeSegment as Locale) : (i18n.defaultLocale as Locale);
  };

  const currentLocale = getCurrentLocale();

  const languageNames: Record<Locale, string> = {
    en: "English",
    es: "Español",
  };

  const changeLanguage = (newLocale: Locale) => {
    if (!pathname) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    setIsOpen(false); // Close dropdown
    router.push(newPath);
    router.refresh();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-10 px-3 rounded-full text-sm font-medium text-[#222222] hover:bg-gray-100 focus:outline-none transition-colors"
      >
        <span className="mr-1">{currentLocale.toUpperCase()}</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          {i18n.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => changeLanguage(locale)}
              disabled={currentLocale === locale}
              className={`w-full text-left px-4 py-2 text-sm 
                ${currentLocale === locale
                  ? 'bg-purple-500 text-white cursor-default'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              {languageNames[locale]}
              {/* Optional: Add full language name e.g., English, Español */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 