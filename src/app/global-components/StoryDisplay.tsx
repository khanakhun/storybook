import React, { useState } from "react";
import { FcSpeaker } from "react-icons/fc";

interface StoryDisplayProps {
  story: string;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const formatStory = (story: string) => {
    const paragraphs = story.split("\n").filter((para) => para.trim() !== "");
    return paragraphs.map((para, index) => (
      <p key={index} className="text-lg text-white mb-4">
        {para}
      </p>
    ));
  };

  const playStory = () => {
    if (!story) return;

    // Create a speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(story);
    utterance.rate = 1; // Adjust the speaking rate (optional)
    utterance.pitch = 1; // Adjust the pitch (optional)

    // Start the speech synthesis
    window.speechSynthesis.speak(utterance);

    // Set isPlaying state to true
    setIsPlaying(true);

    // Listen for when the speech is finished and reset the state
    utterance.onend = () => {
      setIsPlaying(false);
    };
  };

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white mb-4">Your Story:</h2>
        <FcSpeaker className="w-8 h-8 cursor-pointer" onClick={playStory} aria-label="Play Story" />
      </div>
      <div className="text-gray-800">{formatStory(story)}</div>
      {isPlaying && <p className="text-white">Story is being read aloud...</p>}
    </div>
  );
};

export default StoryDisplay;
