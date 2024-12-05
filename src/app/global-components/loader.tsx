import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAppStore } from "@/lib/store";

const AppLoader = () => {
  const { language } = useAppStore();
  return (
    <div>
      <div className="flex justify-center">
        <DotLottieReact
          className="w-48 h-48"
          src={"/loader.lottie"}
          loop
          autoplay
        />
      </div>
      <p className="text-center text-white mt-4 text-[18px] animate-bounce">
        {" "}
        {language
          ? "Creating your own magical adventure, just a moment! ... ✨📚"
          : "יצירת ההרפתקה הקסומה שלך, רק רגע! ... ✨📚"}{" "}
      </p>
    </div>
  );
};

export default AppLoader;
