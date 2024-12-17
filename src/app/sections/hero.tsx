"use client";
import React, { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateStory } from "../services/api";
import HeroText from "../global-components/HeroText";
import InputBar from "../global-components/InputBar";
import { useAppStore } from "@/lib/store";
import Link from "next/link";

const Hero = () => {
  const {
    setHebrewStory,
    setEnglishStory,
    setHebrewLoading,
    setEnglishLoading,
    isLoadingEnglish,
    isLoadingHebrew,
    language,
    setHebrewVoiceStory,
    setEnglishVoiceStory,
    setStoryImage,
  } = useAppStore(); // Accessing loading states and setter functions for both languages

  const [text, setText] = useState("");

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleGenerateStory = useCallback(async () => {
    if (!text.trim()) {
      toast("Please enter a prompt!");
      return;
    }

    // Start loading for both languages
    setEnglishLoading(true);
    setHebrewLoading(true);
    setHebrewVoiceStory(null);
    setEnglishVoiceStory(null);
    setStoryImage(null);
    try {
      // Fetch the story for the selected language (English or Hebrew)
      if (language === "en") {
        // Fetch English story and update its loading state
        const englishStory = await generateStory(text, "en");
        setEnglishStory(englishStory);
        setEnglishLoading(false); // Stop English loading when done

        // Fetch Hebrew story in the background
        const hebrewStory = await generateStory(text, "he");
        setHebrewStory(hebrewStory);
        setHebrewLoading(false); // Stop Hebrew loading when done
      } else {
        // Fetch Hebrew story and update its loading state
        const hebrewStory = await generateStory(text, "he");
        setHebrewStory(hebrewStory);
        setHebrewLoading(false); // Stop Hebrew loading when done

        // Fetch English story in the background
        const englishStory = await generateStory(text, "en");
        setEnglishStory(englishStory);
        setEnglishLoading(false); // Stop English loading when done
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle error and set stories as error message if needed
      setEnglishStory(error.message);
      setHebrewStory(error.message);
      setEnglishLoading(false);
      setHebrewLoading(false);
    }
  }, [text, language, setEnglishStory, setHebrewStory, setEnglishLoading, setHebrewLoading]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleGenerateStory();
    }
  };

  return (
    <div className="">
      <ToastContainer position="top-center" autoClose={5000} />
      <HeroText />
      <div className="flex gap-3 lg:flex-row flex-col justify-center items-center p-2">
        <InputBar
          value={text}
          onChange={handleChangeText}
          onKeyDown={handleKeyPress}
          onSearch={handleGenerateStory}
          loading={isLoadingEnglish || isLoadingHebrew} // Show loading if either language is being fetched
        />
        <Link href={"/#storyloader"}>
          <button
            onClick={handleGenerateStory}
            className="bg-[#FF7F3E] text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-green-500 transition"
          >
            {language === "en" ? "Imagine and Create ✨📖" : "דמיין וצור ✨📖"}
          </button>
        </Link>
      </div>
      <div className="px-20 mt-20"></div>
    </div>
  );
};

export default Hero;
