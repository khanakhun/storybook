import React from "react";
import { KidCarousel } from "../global-components/kid-carousel";

const MainCarousel: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full mt-10">
      <KidCarousel />
    </div>
  );
};

export default MainCarousel;
