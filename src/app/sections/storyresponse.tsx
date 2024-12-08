"use client";

import React, { useState, useRef, useEffect } from "react";
import leftCloud from "../assets/svg/leftc.svg";
import rightCloud from "../assets/svg/rightc.svg";
import leftTree from "../assets/svg/leftt.svg";
import rightTree from "../assets/svg/rightt.svg";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { generateSpeech } from "../services/api";
import AvatarSwapper from "../global-components/AvatarSwapper";
import Typewriter from "../global-components/TypeWritter";

const StoryResponse = () => {
  const { englishStory, hebrewStory, language, storyImage } = useAppStore();

  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [audioUrl, setAudioUrl] = useState<string | null | any>(null);
  const [voice, setVoice] = useState("alloy");
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Clean up old audio URLs
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const handleSpeakerClick = async () => {
    const story = language === "en" ? englishStory : hebrewStory;

    if (!story) {
      setError(language === "en" ? "No story available to play." : "אין סיפור לנגן.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const response = await generateSpeech(story, voice);

      if (!response.audioUrl) {
        throw new Error(language === "en" ? "Audio URL not found." : "לא נמצאה כתובת אודיו.");
      }

      // Handle blob or direct audio URL
      if (response.audioUrl.startsWith("blob:")) {
        const blobUrl = response.audioUrl;
        const responseBlob = await fetch(blobUrl);
        const blob = await responseBlob.blob();
        const audioUrl = URL.createObjectURL(blob);
        setAudioUrl(audioUrl);
      } else {
        setAudioUrl(response.audioUrl);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(language === "en" ? `Error: ${error.message}` : `שגיאה: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleVoiceChange = (selectedVoice: string) => {
    setVoice(selectedVoice);

    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <div className="relative h-screen mb-20">
      <div className="flex flex-col items-center justify-center h-full px-4 py-8">
        <div className="relative bg-white shadow-lg rounded-lg p-6 border-4 border-orange-500 max-w-4xl w-full text-center">
          {/* Decorative Images */}
          <div className="absolute -top-12 -left-12 hidden sm:block">
            <Image src={leftCloud} alt="Left Cloud" width={196} height={90} />
          </div>
          <div className="absolute -top-32 -right-52 hidden sm:block">
            <Image src={rightCloud} alt="Right Cloud" width={366} height={147} />
          </div>
          <div className="absolute -bottom-20 -left-52 hidden sm:block">
            <Image src={leftTree} alt="Left Tree" width={307} height={121} />
          </div>
          <div className="absolute -bottom-20 -right-52 hidden sm:block">
            <Image src={rightTree} alt="Right Tree" width={307} height={121} />
          </div>

          {/* Title and Voice Selector */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h2 className="text-orange-500 font-bold text-2xl sm:text-3xl">{language === "en" ? "Your Special Story" : "סיפור מיוחד שלך"}</h2>

            <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
              <AvatarSwapper handleVoiceChange={handleVoiceChange} />
            </div>
          </div>
          <div className="flex justify-center">
            {storyImage && <Image className="rounded-lg" src={storyImage} alt="Left Cloud" width={196} height={90} />}
          </div>
          {/* Story Text */}
          {language === "en" && englishStory ? (
            <div className="text-[#FF7F3E] text-lg sm:text-xl leading-relaxed mt-5 mb-6">
              <Typewriter text={englishStory} delay={30} />
            </div>
          ) : language === "he" && hebrewStory ? (
            <div className="text-[#FF7F3E] text-lg sm:text-xl leading-relaxed mt-5 mb-6">
              <Typewriter text={hebrewStory} delay={30} />
            </div>
          ) : (
            <p className="text-red-500 mt-4">{language === "en" ? "No story available." : "אין סיפור זמין."}</p>
          )}

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row items-center  mt-6 ${audioUrl ? "justify-between " : "justify-center"} `}>
            <button
              onClick={handleSpeakerClick}
              className="bg-orange-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto mb-4 sm:mb-0"
              disabled={isLoading || isPlaying}
            >
              {isLoading ? (language === "en" ? "Generating Audio..." : "יוצר אודיו...") : language === "en" ? "Play My Story" : "נגן את הסיפור שלי"}
            </button>

            {audioUrl && (
              <div className={`flex gap-4  justify-center items-center w-full sm:w-auto`}>
                <button onClick={handlePlayPause} className="bg-blue-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto">
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button onClick={handleStop} className="bg-red-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto">
                  Stop
                </button>
              </div>
            )}
            {audioUrl && (
              <a href={audioUrl} download={`story-audio.mp3`} className="bg-green-500 text-white font-bold px-4 py-2 rounded shadow-md">
                Download Audio
              </a>
            )}
          </div>

          {/* Error and Audio Controls */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {audioUrl && (
            <div className="mt-6 flex justify-center">
              <audio
                ref={audioRef}
                src={audioUrl}
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controlsList="nodownload"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryResponse;
