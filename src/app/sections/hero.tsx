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
  const { language, setStory, setLoading, isLoading } = useAppStore();
  const [text, setText] = useState("");

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handleGenerateStory = useCallback(async () => {
    if (!text.trim()) {
      toast("Please enter a prompt!");
      return;
    }
    setStory("");
    setLoading(true);
    try {
      const story = await generateStory(text, language);
      setStory(story);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStory(error.message);
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
        <InputBar value={text} onChange={handleChangeText} onKeyDown={handleKeyPress} onSearch={handleGenerateStory} loading={isLoading} />
        <Link href={"/#storyloader"}>
          <button
            onClick={handleGenerateStory}
            className="bg-[#3CFF57] text-black font-bold px-6 py-2 rounded-lg shadow-md hover:bg-green-500 transition"
          >
            Create
          </button>
        </Link>
      </div>
      <div className="px-20 mt-20"></div>
    </div>
  );
};

export default Hero;
