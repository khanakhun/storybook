"use client";

import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import Typical from "react-typical";

const Hero = () => {
  const [text, setText] = useState(
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas aliquid esse fugiat maxime alias porro, voluptatibus cupiditate veniam exercitationem, magnam ex aperiam natus molestias iure sint sed error, atque fuga ad numquam temporibus velit expedita praesentium quia? Non cum molestiae provident, autem enim, ab aliquam quasi quam pariatur consequuntur animi?"
  );

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Text */}
        <p className="text-4xl font-bold text-gray-800 mb-4">Listen to thousands of stories 📖 </p>
        <p className="text-gray-600 text-lg mb-8">Write a prompt to generate a story 😀</p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Type something here..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Dynamic Typing"
            onChange={handleChangeText} // Update state with input value
          />
          <button type="button" className="absolute inset-y-0 right-0 flex items-center justify-center pr-4" aria-label="Search">
            <FcSearch className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* Typing Effect with Dynamic Text */}
      <div className="px-20 mt-20 text-[15px]">
        <Typical steps={[text, 1000]} loop={Infinity} wrapper="p" />
      </div>
    </div>
  );
};

export default Hero;
