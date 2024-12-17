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
  storyImage: string | null;
  setStoryImage: (newImage: string | null) => void; // New setter for the story image

  // New voice story variables and loaders
  englishVoiceStory: string | null;
  hebrewVoiceStory: string | null;
  setEnglishVoiceStory: (newVoiceStory: string | null) => void;
  setHebrewVoiceStory: (newVoiceStory: string | null) => void;
  englishVoiceLoader: boolean;
  hebrewVoiceLoader: boolean;
  setEnglishVoiceLoader: (loadingState: boolean) => void;
  setHebrewVoiceLoader: (loadingState: boolean) => void;
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

  storyImage: null, // Initial state for story image
  setStoryImage: (newImage: string | null) => set(() => ({ storyImage: newImage })),

  // New state and functions for voice story and loaders
  englishVoiceStory: null,
  hebrewVoiceStory: null,
  setEnglishVoiceStory: (newVoiceStory: string | null) => set(() => ({ englishVoiceStory: newVoiceStory })),
  setHebrewVoiceStory: (newVoiceStory: string | null) => set(() => ({ hebrewVoiceStory: newVoiceStory })),

  englishVoiceLoader: false,
  hebrewVoiceLoader: false,
  setEnglishVoiceLoader: (loadingState: boolean) => set(() => ({ englishVoiceLoader: loadingState })),
  setHebrewVoiceLoader: (loadingState: boolean) => set(() => ({ hebrewVoiceLoader: loadingState })),
}));
