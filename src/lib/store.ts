import { create } from "zustand";

type LanguageState = {
  language: "en" | "he";
  setLanguage: (newLanguage: "en" | "he") => void;
};

type StoryState = {
  englishStory: string | null;
  hebrewStory: string | null;
  setEnglishStory: (newStory: string) => void;
  setHebrewStory: (newStory: string) => void;
  isLoadingEnglish: boolean;
  isLoadingHebrew: boolean;
  setEnglishLoading: (loadingState: boolean) => void;
  setHebrewLoading: (loadingState: boolean) => void;
};

type AppState = LanguageState & StoryState;

export const useAppStore = create<AppState>((set) => ({
  language: "en",
  setLanguage: (newLanguage: "en" | "he") => set(() => ({ language: newLanguage })),

  englishStory: null,
  hebrewStory: null,
  setEnglishStory: (newStory: string) => set(() => ({ englishStory: newStory })),
  setHebrewStory: (newStory: string) => set(() => ({ hebrewStory: newStory })),

  isLoadingEnglish: false,
  isLoadingHebrew: false,
  setEnglishLoading: (loadingState: boolean) => set(() => ({ isLoadingEnglish: loadingState })),
  setHebrewLoading: (loadingState: boolean) => set(() => ({ isLoadingHebrew: loadingState })),
}));
