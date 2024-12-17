"use client";

import Link from "next/link";
import footerimage from "../assets/footerimage.svg";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-cover bg-center  p-4 lg:p-20" style={{ backgroundImage: `url(${footerimage.src})` }}>
      <div className="flex flex-col items-center justify-center text-center px-6">
        <p className="text-white text-lg font-semibold mb-4">Get fun content and a supportive community with</p>
        <p className="text-white text-xl font-bold">@Story book_official</p>
        <Link href="#" className="mt-4 bg-purple-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-purple-700 transition-all">
          Follow us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
