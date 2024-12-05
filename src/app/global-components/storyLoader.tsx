"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAppStore } from "@/lib/store";

const StoryLoader = () => {
  const { language } = useAppStore();
  return (
    <div className="flex justify-center items-center flex-col ">
      <DotLottieReact
        className="w-48 h-48"
        src={"/chicken.lottie"}
        loop
        autoplay
      />
      <p className="font-bold mt-10 animate-bounce text-center text-white">
        {language
          ? "Creating your own magical adventure, just a moment! ... 🎉"
          : "יצירת ההרפתקה הקסומה שלך, רק רגע! ... 🎉"}
      </p>
    </div>
  );
};

export default StoryLoader;
