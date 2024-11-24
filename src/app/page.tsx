import React from "react";
import Hero from "./sections/hero";
import Lottie from "./components/lottie";

const page = () => {
  return (
    <div>
      <div className="flex justify-center">
        <Lottie />
      </div>
      <Hero />
    </div>
  );
};

export default page;
