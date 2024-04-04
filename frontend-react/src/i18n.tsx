// i18n.tsx -> i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import bgTranslation from "./locales/bg.json";

// Initialize i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    bg: {
      translation: bgTranslation,
    },
  },
  lng: "bg", // Set default language to Bulgarian
  fallbackLng: "bg", // Fallback language
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
