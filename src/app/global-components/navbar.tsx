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
import Link from "next/link";

const Header: React.FC = () => {
  const { language, setLanguage } = useAppStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const menuItems = ["Create", "Listen"];
  const socialIcons = [
    { src: fbIcon, alt: "Facebook" },
    { src: igIcon, alt: "Instagram" },
    { src: tiktokIcon, alt: "TikTok" },
    { src: ytIcon, alt: "YouTube" },
  ];
  const languages = [
    { code: "en", src: enImage, label: "English" },
    { code: "he", src: heImage, label: "Hebrew" },
  ];

  const selectLanguage = (lang: string) => {
    setLanguage(lang as "en" | "he");
    setIsDropdownOpen(false);
  };

  return (
    <header id="Create" className="w-[90%] mx-auto">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Hamburger Icon for Mobile */}
        <button onClick={toggleMobileMenu} className="md:hidden flex items-center focus:outline-none" aria-label="Toggle Mobile Menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Logo */}
        <ul className="hidden md:flex items-center gap-6 text-white font-bold">
          {menuItems.map((item) => (
            <Link href={`#${item}`} key={item}>
              <li key={item} className="hover:text-blue-500 cursor-pointer">
                {item}
              </li>
            </Link>
          ))}
        </ul>
        <div className="relative flex items-center justify-center">
          <Image src={logo} alt="StoryBook Logo" width={130} height={60} />
          <Image src={logotext} alt="StoryBook Text" width={150} height={70} className="absolute" />
        </div>

        {/* Social Media and Language Selector */}
        <div className="flex items-center gap-3">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none"
              aria-label="Toggle Language Dropdown"
              aria-expanded={isDropdownOpen}
            >
              <Image
                src={languages.find((lang) => lang.code === language)?.src || enImage}
                alt={language === "en" ? "English" : "Hebrew"}
                width={24}
                height={24}
                className="rounded"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded shadow-lg z-10">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code)}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <Image src={lang.src} alt={lang.label} width={24} height={24} className="rounded" />
                    <span className="ml-2">{lang.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Social Media Icons */}
          <div className="hidden md:flex gap-3">
            {socialIcons.map((icon, index) => (
              <Image key={index} src={icon.src} alt={icon.alt} width={24} height={24} className="cursor-pointer" />
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-2">
          <ul className="flex flex-col items-start gap-4 p-4">
            {menuItems.map((item) => (
              <Link href={`#${item}`} key={item}>
                <li key={item} className="hover:text-blue-500 cursor-pointer">
                  {item}
                </li>
              </Link>
            ))}

            {/* Social Media Icons */}
            <div className="flex gap-3 mt-4">
              {socialIcons.map((icon, index) => (
                <Image key={index} src={icon.src} alt={icon.alt} width={24} height={24} className="cursor-pointer" />
              ))}
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
