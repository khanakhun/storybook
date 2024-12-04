import { useAppStore } from "@/lib/store";
import React from "react";

const HeroText: React.FC = () => {
  const { language } = useAppStore(); // Zustand hooks

  return (
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-4xl  font-bold mb-5 text-white"> {language === "en" ? " Discover Magical Stories ✨📖" : " גלה סיפורים קסומים ✨📖"}</p>
      <p className="text-white text-xl mb-8 mt-10 font-bold">
        {language === "en" ? " Type a prompt to generate a wonderful story just for you! 🌟" : "הקלד הנחיה כדי ליצור סיפור נפלא רק בשבילך! 🌟"}
      </p>
    </div>
  );
};

export default HeroText;
