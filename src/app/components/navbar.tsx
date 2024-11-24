"use client";

import { useState } from "react";
import Image from "next/image";
import enimage from "../assets/en.png";
import heimage from "../assets/he.png";
import icon from "../favicon.ico";
const Navbar: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "he">("en");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectLanguage = (lang: "en" | "he") => {
    setLanguage(lang);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white text-gray-800 shadow-md">
      {/* Left Side: Logo */}
      <div className="flex gap-3">
        <Image src={icon} alt={language === "en" ? "English" : "Hebrew"} width={24} height={24} className="rounded" />
        <p className="text-lg font-bold "> StoryBook</p>
      </div>

      {/* Right Side: Language Dropdown */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center p-2 transition-transform transform hover:scale-105 focus:outline-none"
          aria-label="Toggle Language Dropdown"
        >
          <Image
            src={language === "en" ? enimage : heimage}
            alt={language === "en" ? "English" : "Hebrew"}
            width={24}
            height={24}
            className="rounded"
          />
          <span className="ml-2">{language === "en" ? "English" : "Hebrew"}</span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded shadow-lg text-gray-800 z-10">
            <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => selectLanguage("en")}>
              <Image src={enimage} alt="English" width={24} height={24} className="rounded" />
              <span className="ml-2">English</span>
            </div>
            <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => selectLanguage("he")}>
              <Image src={heimage} alt="Hebrew" width={24} height={24} className="rounded" />
              <span className="ml-2">Hebrew</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
