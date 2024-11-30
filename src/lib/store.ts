import { create } from "zustand";

type LanguageState = {
  language: "en" | "he";
  setLanguage: (newLanguage: "en" | "he") => void;
};

type StoryState = {
  story: string | null;
  setStory: (newStory: string) => void;
  isLoading: boolean;
  setLoading: (loadingState: boolean) => void;
};

type AppState = LanguageState & StoryState;

export const useAppStore = create<AppState>((set) => ({
  language: "en",
  setLanguage: (newLanguage: "en" | "he") => set(() => ({ language: newLanguage })),

  // Story state
  story: null,
  setStory: (newStory: string) => set(() => ({ story: newStory })),
  isLoading: false,
  setLoading: (loadingState: boolean) => set(() => ({ isLoading: loadingState })),
}));
