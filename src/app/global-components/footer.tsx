"use client";

import React from "react";
import Link from "next/link";
import logotext from "../assets/svg/text.svg";
import logo from "../../app/assets/svg/cloud.svg";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <>
      <hr />
      <footer className="w-full  text-white py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Column 1: Logo */}
          <div className="flex flex-col items-center md:items-center">
            <div className="relative flex items-center justify-center ">
              <Image src={logo} alt="StoryBook Logo" width={130} height={60} />
              <Image src={logotext} alt="StoryBook Text" width={150} height={70} className="absolute" />
            </div>

            <p className="text-sm">Your trusted storytelling companion.</p>
          </div>

          {/* Column 2: Title and Text */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold mb-2">About Us</h3>
            <p className="text-sm text-center">Discover engaging stories and connect with a community that loves creativity and fun!</p>
          </div>

          {/* Column 3: Button */}
          <div className="flex flex-col items-center md:items-center justify-center">
            <Link href="#" className="bg-purple-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-purple-700 transition-all">
              Join Us
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
