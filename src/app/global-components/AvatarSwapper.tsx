import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import fableimage from "../assets/voices/fable.webp";
import echoimage from "../assets/voices/echo.webp";
import alloyimage from "../assets/voices/alloy.webp";
import onyximage from "../assets/voices/onyx.webp";
import novaimage from "../assets/voices/nova.webp";
import shimmerimage from "../assets/voices/shimmer.webp";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Voice = {
  value: string;
  label: string;
  image: { src: string };
};

const voices: Voice[] = [
  { value: "alloy", label: "Alloy", image: alloyimage },
  { value: "echo", label: "Echo", image: echoimage },
  { value: "fable", label: "Fable", image: fableimage },
  { value: "onyx", label: "Onyx", image: onyximage },
  { value: "nova", label: "Nova", image: novaimage },
  { value: "shimmer", label: "Shimmer", image: shimmerimage },
];

const AvatarCarousel = ({ handleVoiceChange, voice }: { handleVoiceChange: (voice: string) => void; voice: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex + 3 < voices.length) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const visibleVoices = voices.slice(currentIndex, currentIndex + 3);

  return (
    <TooltipProvider>
      <div className="flex items-center gap-4">
        {/* Left Navigation */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous Avatars"
          className={`text-[#F26F23] ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FaArrowLeft />
        </button>

        {/* Avatars */}
        <div className="flex gap-4">
          {visibleVoices.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Avatar
                  className={`cursor-pointer ${voice === item.value ? "w-[80px] h-[80px] border-4 border-[#F26F23]" : "w-[60px] h-[60px]"}`}
                  onClick={() => handleVoiceChange(item.value)}
                >
                  <AvatarImage src={item.image.src} />
                  <AvatarFallback>{item.label[0]}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Right Navigation */}
        <button
          onClick={handleNext}
          disabled={currentIndex + 3 >= voices.length}
          aria-label="Next Avatars"
          className={`text-[#F26F23]  ${currentIndex + 3 >= voices.length ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FaArrowRight />
        </button>
      </div>
    </TooltipProvider>
  );
};

export default AvatarCarousel;
