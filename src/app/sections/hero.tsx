import React from "react";
import { FiSearch } from "react-icons/fi";

const Hero = () => {
  return (
    <div className=" py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Text */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Perfect Story</h1>
        <p className="text-gray-600 text-lg mb-8">Search from thousands of stories to inspire your journey.</p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search stories..."
            className="w-full px-4 py-3 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="absolute inset-y-0 right-0 flex items-center pr-4">
            <FiSearch className="text-gray-500 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
