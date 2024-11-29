"use client";
import React, { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateStory } from "../services/api";
import HeroText from "../global-components/HeroText";
import InputBar from "../global-components/InputBar";
import LoaderWrapper from "../global-components/LoaderWrapper";
import StoryDisplay from "../global-components/StoryDisplay";
import { useLanguageStore } from "@/lib/store";

const Hero = () => {
  const { language } = useLanguageStore();
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleGenerateStory = useCallback(async () => {
    if (!text.trim()) {
      toast("Please enter a prompt!");
      return;
    }

    setResponse("");
    setLoading(true);

    try {
      const story = await generateStory(text, language);
      setResponse(story);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setResponse(error.message);
    } finally {
      setLoading(false);
    }
  }, [text]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleGenerateStory();
    }
  };

  return (
    <div className="">
      <ToastContainer position="top-center" autoClose={5000} />
      <HeroText />
      <div className="flex gap-3 mt-20">
        <InputBar value={text} onChange={handleChangeText} onKeyDown={handleKeyPress} onSearch={handleGenerateStory} loading={loading} />
        <button
          onClick={handleGenerateStory}
          className="bg-[#3CFF57] text-black font-bold px-6 py-2 rounded-lg shadow-md hover:bg-green-500 transition"
        >
          Create
        </button>
      </div>

      <div className="px-20 mt-20">
        {loading && <LoaderWrapper />}
        {response && !loading && <StoryDisplay story={response} />}
        {/* {!response && !loading && <MainCarousel />} */}
      </div>
    </div>
  );
};

export default Hero;
