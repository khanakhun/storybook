import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Updated voices array
const voices = [
  {
    value: "alloy",
    label: "Alloy",
    image: "https://cdn.pixabay.com/photo/2022/05/15/03/49/girl-7196709_640.png",
  },
  {
    value: "echo",
    label: "Echo",
    image: "https://static.vecteezy.com/system/resources/thumbnails/028/794/706/small_2x/cartoon-cute-school-boy-photo.jpg",
  },
  {
    value: "fable",
    label: "Fable",
    image: "https://img.lovepik.com/png/20231113/sticker-of-cartoon-female-muslim-with-head-scarf-and-orange_581042_wh860.png",
  },
];

const AvatarSwapper = () => {
  // State to manage the images
  const [mainImage, setMainImage] = useState(voices[0].image);
  const [otherImages, setOtherImages] = useState(voices.slice(1));

  // Handle image swap
  const handleImageSwap = (clickedImage) => {
    const newImages = otherImages.map((voice) => (voice.image === clickedImage ? { ...voice, image: mainImage } : voice));
    setOtherImages(newImages);
    setMainImage(clickedImage);
  };

  return (
    <div className="flex gap-4">
      {/* Other Avatars */}
      <div className="flex gap-2">
        {otherImages.map((voice, index) => (
          <Avatar key={index} className="cursor-pointer" onClick={() => handleImageSwap(voice.image)}>
            <AvatarImage src={voice.image} />
            <AvatarFallback>{voice.label[0]}</AvatarFallback> {/* Display first letter of the label */}
          </Avatar>
        ))}
      </div>
      {/* Main Avatar */}
      <Avatar className="w-[100px] h-[100px]">
        <AvatarImage src={mainImage} />
        <AvatarFallback>{voices[0].label[0]}</AvatarFallback> {/* Display first letter of the main label */}
      </Avatar>
    </div>
  );
};

export default AvatarSwapper;
