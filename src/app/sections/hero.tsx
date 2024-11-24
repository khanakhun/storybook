import React from "react";
import { FcSearch } from "react-icons/fc";

const Hero = () => {
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
            placeholder="Search stories..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Search stories"
          />
          <button type="button" className="absolute inset-y-0 right-0 flex items-center justify-center pr-4" aria-label="Search">
            <FcSearch className=" w-6 h-6" />
          </button>
        </div>
      </div>
      <p className="px-20 mt-5 text-[15px]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis eius cum aperiam, exercitationem provident, alias qui quam illo, dolorum
        repudiandae nihil. Repellat beatae repellendus voluptas. Necessitatibus sapiente ad totam, iste ab modi, corrupti natus aut assumenda
        dignissimos obcaecati, quibusdam consequuntur debitis. Repellendus atque facere asperiores! Dolorum facere tempore et hic.
      </p>
    </div>
  );
};

export default Hero;
