import React from "react";
import { KidCarousel } from "../global-components/kid-carousel";

const PreStories = () => {
  return (
    <div id="Listen">
      <div className="w-full h-screen py-10 mb-10 ">
        <h2 className="text-center text-white text-2xl md:text-4xl font-bold mb-10">Discover Magical Stories</h2>
        <div className="flex justify-center flex-col items-center">
          <KidCarousel slice={0} />
          <div style={{ height: 20 }} />
          <KidCarousel slice={7} />
        </div>
      </div>
    </div>
  );
};

export default PreStories;
