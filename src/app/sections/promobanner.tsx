"use client";

import React from "react";
import backgroundImg from "../assets/svg/promo.svg";

const PromoBanner = () => {
  return (
    <div
      className="relative w-full bg-cover bg-center h-64 sm:h-80 md:h-96 flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImg.src})`, // Ensure `.src` is used
      }}
    >
      {/* Overlay with text and button */}
      <div className="text-center text-white px-4">
        {/* Adjust font sizes for smaller screens */}
        <p className="text-base sm:text-lg md:text-xl font-semibold">Get fun content and a supportive community with</p>
        <p className="text-lg sm:text-2xl md:text-3xl font-bold mt-1">@Story_book_official</p>
        {/* Responsive button */}
        <button className="mt-4 px-4 py-2 sm:px-6 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md">Follow us</button>
      </div>
    </div>
  );
};

export default PromoBanner;
