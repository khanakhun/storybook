import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import fableimage from "../assets/voices/fable.png";
import echoimage from "../assets/voices/echo.jpg";
import alloyimage from "../assets/voices/alloy.png";
import onyximage from "../assets/voices/onyx.jpg";
import novaimage from "../assets/voices/nova.jpg";
import shimmerimage from "../assets/voices/sh.jpg";

// Updated voices array
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
  { value: "onyx", label: "Onyx", image: onyximage }, // New voice
  { value: "nova", label: "Nova", image: novaimage }, // New voice
  { value: "shimmer", label: "Shimmer", image: shimmerimage }, // New voice
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvatarSwapper = ({ handleVoiceChange }: any) => {
  // State to manage the images
  const [mainImage, setMainImage] = useState(voices[0].image);
  const [otherImages, setOtherImages] = useState(voices.slice(1));

  // Handle image swap
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageSwap = (clickedImage: any) => {
    const clickedVoice = voices.find((voice) => voice.image === clickedImage);
    if (clickedVoice) {
      const newImages = otherImages.map((voice) => (voice.image === clickedImage ? { ...voice, image: mainImage } : voice));
      setOtherImages(newImages);
      setMainImage(clickedImage);
      if (clickedVoice.value) {
        handleVoiceChange(clickedVoice.value);
      }
    }
  };
  return (
    <div className="flex gap-4">
      {/* Other Avatars */}
      <div className="flex gap-2">
        {otherImages.map((voice, index) => (
          <Avatar key={index} className="cursor-pointer" onClick={() => handleImageSwap(voice.image)}>
            <AvatarImage src={voice.image.src} />
            <AvatarFallback>{voice.label[0]}</AvatarFallback> {/* Display first letter of the label */}
          </Avatar>
        ))}
      </div>
      {/* Main Avatar */}
      <Avatar className="w-[100px] h-[100px]">
        <AvatarImage src={mainImage.src} />
        <AvatarFallback>{voices[0].label[0]}</AvatarFallback> {/* Display first letter of the main label */}
      </Avatar>
    </div>
  );
};

export default AvatarSwapper;
