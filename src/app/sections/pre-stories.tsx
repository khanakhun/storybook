import React from "react";
import { KidCarousel } from "../global-components/kid-carousel";
import { useAppStore } from "@/lib/store";

const PreStories = () => {
  const { language } = useAppStore(); // Zustand hooks

  return (
    <div id="Listen">
      <div className="w-full h-screen py-10 mb-10">
        <h2 className="text-center text-white text-2xl md:text-4xl font-bold mb-10">
          {language === "en" ? "Choose Your Adventure 🌟✨" : "בחרו את ההרפתקה שלכם 🌟✨"}
        </h2>
        <p className="text-white text-xl text-center mb-8 mt-10 font-bold pl-8 pr-8 lg:pl-48 lg:pr-48">
          {language === "en"
            ? "Pick a card to unlock a magical story just for you! Each card holds a unique adventure—click to discover the fun and excitement waiting inside. Let the storytelling begin!"
            : "בחרו כרטיס כדי לחשוף סיפור קסום רק בשבילכם! כל כרטיס מחביא הרפתקה ייחודית—לחצו כדי לגלות את הכיף וההתרגשות שמחכים לכם. שיהיה בכיף!"}
        </p>
        <div className="flex justify-center flex-col items-center">
          <KidCarousel slice={0} aria-label="Choose a story adventure card" />
          {/* <KidCarousel slice={7} aria-label="Choose another story adventure card" /> */}
        </div>
      </div>
    </div>
  );
};

export default PreStories;
