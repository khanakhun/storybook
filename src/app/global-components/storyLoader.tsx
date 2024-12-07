"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAppStore } from "@/lib/store";

const StoryLoader = () => {
  const { language } = useAppStore();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <DotLottieReact className="w-48 h-48" src="/chicken.lottie" loop autoplay />
      <p className="font-bold text-center text-white mt-6 animate-bounce">
        {language === "en" ? "Creating your own magical adventure, just a moment! ... 🎉" : "יצירת ההרפתקה הקסומה שלך, רק רגע! ... 🎉"}
      </p>
    </div>
  );
};

export default StoryLoader;
