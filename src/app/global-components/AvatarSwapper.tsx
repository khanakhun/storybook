import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import fableimage from "../assets/voices/fable.webp";
import echoimage from "../assets/voices/echo.webp";
import alloyimage from "../assets/voices/alloy.webp";
import onyximage from "../assets/voices/onyx.webp";
import novaimage from "../assets/voices/nova.webp";
import shimmerimage from "../assets/voices/shimmer.webp";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define the Voice type
type Voice = {
  value: string;
  label: string;
  image: { src: string };
};

// Voices array with new voices
const voices: Voice[] = [
  { value: "alloy", label: "Alloy", image: alloyimage },
  { value: "echo", label: "Echo", image: echoimage },
  { value: "fable", label: "Fable", image: fableimage },
  { value: "onyx", label: "Onyx", image: onyximage },
  { value: "nova", label: "Nova", image: novaimage },
  { value: "shimmer", label: "Shimmer", image: shimmerimage },
];

const AvatarSwapper = ({ handleVoiceChange }: { handleVoiceChange: (voice: string) => void }) => {
  // State to manage the images
  const [mainImage, setMainImage] = useState(voices[0].image);
  const [otherImages, setOtherImages] = useState(voices.slice(1));

  // Handle image swap
  const handleImageSwap = (clickedVoice: Voice) => {
    const newImages = otherImages.map((voice) => (voice.value === clickedVoice.value ? { ...voice, image: mainImage } : voice));
    setOtherImages(newImages);
    setMainImage(clickedVoice.image);
    handleVoiceChange(clickedVoice.value);
  };

  return (
    <TooltipProvider>
      <div className="flex gap-4">
        {/* Other Avatars with Tooltip */}
        <div className="flex gap-2">
          {otherImages.map((voice, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Avatar className="cursor-pointer w-[50px] h-[50px]" onClick={() => handleImageSwap(voice)}>
                  <AvatarImage src={voice.image.src} />
                  <AvatarFallback>{voice.label[0]}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{voice.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        {/* Main Avatar */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="w-[100px] h-[100px] border-2 border-[#F16C27]">
              <AvatarImage src={mainImage.src} />
              <AvatarFallback>{voices[0].label[0]}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>{voices.find((v) => v.image === mainImage)?.label || "Main Voice"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default AvatarSwapper;
