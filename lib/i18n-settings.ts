import { InitOptions } from 'i18next';
import { i18n } from './i18n'; // Your languages configuration

export const fallbackLng = i18n.defaultLocale;
export const locales = i18n.locales;
export const defaultNS = 'common'; // Default namespace for translations

export function getOptions(lng = fallbackLng, ns = defaultNS): InitOptions {
  return {
    // debug: true, // Uncomment to see i18next logs in console
    supportedLngs: locales,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
} 