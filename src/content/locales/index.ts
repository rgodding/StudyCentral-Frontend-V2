import { da } from "./da";
import { en } from "./en";

export const defaultNS = "translation";

export const supportedLanguages = ["en", "da"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const resources = {
  en: {
    [defaultNS]: en,
  },
  da: {
    [defaultNS]: da,
  },
} as const;