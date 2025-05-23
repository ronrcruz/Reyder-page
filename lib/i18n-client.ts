'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getOptions } from './i18n-settings';
import { i18n } from './i18n';

// Initialize i18next
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(), // Spread default options
    lng: undefined, // Let LanguageDetector detect language
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'], // Detection order
    },
    preload: typeof window === 'undefined' ? i18n.locales : [] // Preload languages on server using imported i18n
  });

export function useTranslation(lng: string, ns?: string | string[], options?: any) {
  if (i18next.resolvedLanguage !== lng) {
    i18next.changeLanguage(lng);
  }
  return useTranslationOrg(ns, options);
} 