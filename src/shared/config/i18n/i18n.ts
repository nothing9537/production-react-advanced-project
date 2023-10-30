import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { translationNamespaces } from '../../consts/translationNamespaces';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: translationNamespaces,
    fallbackLng: 'en',
    debug: false,
    defaultNS: 'translation',
    supportedLngs: ['ru', 'en'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
