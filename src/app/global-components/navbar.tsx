"use client";

import Image from "next/image";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import logotext from "../assets/svg/text.svg";
import logo from "../../app/assets/svg/cloud.svg";
import fbIcon from "../../app/assets/svg/faebook.svg";
import igIcon from "../../app/assets/svg/Group-2.svg";
import tiktokIcon from "../../app/assets/svg/Group-1.svg";
import ytIcon from "../../app/assets/svg/Group.svg";
import enImage from "../assets/en.png";
import heImage from "../assets/he.png";

const Header: React.FC = () => {
  const { language, setLanguage } = useAppStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const selectLanguage = (lang: "en" | "he") => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-[80%] mx-auto  ">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Left Links */}
        <ul className="flex items-center gap-6 text-gray-800 font-bold">
          <li className="hover:text-orange-500 cursor-pointer">About</li>
          <li className="hover:text-orange-500 cursor-pointer">Watch</li>
          <li className="hover:text-orange-500 text-orange-500 cursor-pointer">Listen</li>
        </ul>

        {/* Logo */}
        <div className="relative flex items-center justify-center">
          {/* Background Logo */}
          <Image src={logo} alt="StoryBook Logo" width={130} height={60} />

          {/* Text Overlay */}
          <Image src={logotext} alt="StoryBook Text" width={150} height={70} className="absolute" />
        </div>

        {/* Right Links */}
        <ul className="flex items-center gap-6">
          <li className="hover:text-orange-500 cursor-pointer">Play</li>
          <li className="hover:text-orange-500 cursor-pointer">Events</li>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none"
              aria-label="Toggle Language Dropdown"
              aria-expanded={isDropdownOpen}
            >
              <Image
                src={language === "en" ? enImage : heImage}
                alt={language === "en" ? "English" : "Hebrew"}
                width={24}
                height={24}
                className="rounded"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded shadow-lg z-10">
                <div onClick={() => selectLanguage("en")} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                  <Image src={enImage} alt="English" width={24} height={24} className="rounded" />
                  <span className="ml-2">English</span>
                </div>
                <div onClick={() => selectLanguage("he")} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                  <Image src={heImage} alt="Hebrew" width={24} height={24} className="rounded" />
                  <span className="ml-2">Hebrew</span>
                </div>
              </div>
            )}
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-3">
            <Image src={fbIcon} alt="Facebook" width={24} height={24} className="cursor-pointer" />
            <Image src={igIcon} alt="Instagram" width={24} height={24} className="cursor-pointer" />
            <Image src={tiktokIcon} alt="TikTok" width={24} height={24} className="cursor-pointer" />
            <Image src={ytIcon} alt="YouTube" width={24} height={24} className="cursor-pointer" />
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
