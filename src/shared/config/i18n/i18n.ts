import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['articles', 'about', 'aside', 'main', 'navbar', 'profile', 'translation', 'validate'],
    fallbackLng: 'en',
    debug: __IS_DEV__,
    supportedLngs: ['ru', 'en'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
