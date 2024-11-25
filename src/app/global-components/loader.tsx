import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AppLoader = () => {
  return (
    <div>
      <div className="flex justify-center">
        <DotLottieReact className="w-48 h-48" src={"/loader.lottie"} loop autoplay />
      </div>
      <p className="text-center text-white mt-4 text-[18px]">Creating a magical tale just for you please wait... ✨📚</p>
    </div>
  );
};

export default AppLoader;
