import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  defaultNS,
  resources,
  supportedLanguages,
  type SupportedLanguage,
} from "@/content";

const languageStorageKey = "studycentral-language";

export const fallbackLanguage: SupportedLanguage = "en";

function isSupportedLanguage(value: string | null | undefined): value is SupportedLanguage {
  return supportedLanguages.includes(value as SupportedLanguage);
}

function getStoredLanguage(): SupportedLanguage | null {
  if (typeof window === "undefined") return null;

  const storedLanguage = window.localStorage.getItem(languageStorageKey);

  return isSupportedLanguage(storedLanguage) ? storedLanguage : null;
}

function getBrowserLanguage(): SupportedLanguage | null {
  if (typeof window === "undefined") return null;

  const browserLanguage = window.navigator.language.toLowerCase();

  if (browserLanguage.startsWith("da")) return "da";
  if (browserLanguage.startsWith("en")) return "en";

  return null;
}

function syncHtmlLanguage(language: string) {
  if (typeof document === "undefined") return;

  document.documentElement.lang = language;
}

export function getInitialLanguage(): SupportedLanguage {
  return getStoredLanguage() ?? getBrowserLanguage() ?? fallbackLanguage;
}

export async function setLanguage(language: SupportedLanguage) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(languageStorageKey, language);
  }

  syncHtmlLanguage(language);

  await i18n.changeLanguage(language);
}

const initialLanguage = getInitialLanguage();

syncHtmlLanguage(initialLanguage);

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: fallbackLanguage,
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

i18n.on("languageChanged", (language) => {
  syncHtmlLanguage(language);

  if (typeof window !== "undefined" && isSupportedLanguage(language)) {
    window.localStorage.setItem(languageStorageKey, language);
  }
});

export { i18n };