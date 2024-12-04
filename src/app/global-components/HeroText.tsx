import { useAppStore } from "@/lib/store";
import React from "react";
import sleepimage from "../assets/sleep.jpeg";
import Image from "next/image";

const HeroText: React.FC = () => {
  const { language } = useAppStore(); // Zustand hooks

  return (
    <div className="max-w-4xl mx-auto text-center">
      <p data-aos="fade-down" className="text-4xl  font-bold mb-4  text-white">
        {" "}
        {language === "en" ? " Discover Magical Stories ✨📖" : " גלה סיפורים קסומים ✨📖"}
      </p>
      <p data-aos="fade-down" className="text-white text-xl mb-10   font-bold">
        {language === "en" ? " Type a prompt to generate a wonderful story just for you! 🌟🙂" : "הקלד הנחיה כדי ליצור סיפור נפלא רק בשבילך! 🌟🙂"}
      </p>
      <div data-aos="fade-up" className="flex justify-center mb-10">
        <Image src={sleepimage} width={350} height={350} alt="sleep" className="rounded-lg" />
      </div>
    </div>
  );
};

export default HeroText;
