// store.ts
import { create } from "zustand";

type LanguageState = {
  language: "en" | "he"; // Supported languages
  setLanguage: (newLanguage: "en" | "he") => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "en", // Default language
  setLanguage: (newLanguage: "en" | "he") => set(() => ({ language: newLanguage })),
}));
