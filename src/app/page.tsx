import React from "react";
import Hero from "./sections/hero";
import heroimage from "./assets/hero.png";
import Image from "next/image";
const page = () => {
  return (
    <div>
      <div className="flex justify-center mt-4">
        <Image src={heroimage} alt="Hero Image" width={500} height={500} />
      </div>
      <Hero />
    </div>
  );
};

export default page;
