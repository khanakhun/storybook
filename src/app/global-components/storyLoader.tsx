"use client";

import React from "react";
import leftcarton from "../assets/svg/leftcartoons.svg";
import rightcartoon from "../assets/svg/rightcartoon.svg";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const StoryLoader = () => {
  return (
    <div id="storyloader">
      <div className="flex  h-screen justify-center items-center md:flex-row flex-col">
        {/* <div className="md:flex hidden">
          <Image src={leftcarton} alt="Right Cloud" width={339} height={702} className="justify-self-end " />
        </div> */}
        <div className="flex justify-center items-center flex-col ">
          <DotLottieReact className="w-48 h-48" src={"/chicken.lottie"} loop autoplay />
          <p className="font-bold mt-10 animate-bounce text-center text-white">Creating a magical tale just for you please wait... 🎉</p>
        </div>
        {/* <div>
          <Image src={rightcartoon} alt="Left Cloud" width={339} height={702} className="justify-self-start" />
        </div> */}
      </div>
    </div>
  );
};

export default StoryLoader;
