"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { generateSpeech } from "../services/api";
import AvatarSwapper from "../global-components/AvatarSwapper";
import Typewriter from "../global-components/TypeWritter";
import Clouds from "../static-components/clouds";

const StoryResponse = () => {
  const { setEnglishVoiceLoader, englishVoiceLoader, englishVoiceStory, setEnglishVoiceStory, englishStory, hebrewStory, language, storyImage } =
    useAppStore();

  const [voice, setVoice] = useState("alloy");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefEnglish = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Clean up old audio URLs
    return () => {
      if (englishVoiceStory) URL.revokeObjectURL(englishVoiceStory);
    };
  }, [englishVoiceStory]);

  const handleSpeakerClickEnglish = async () => {
    const story = englishStory;
    setEnglishVoiceLoader(true);
    setEnglishVoiceStory(null);

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
        setEnglishVoiceStory(audioUrl);
      } else {
        setEnglishVoiceStory(response.audioUrl);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    } finally {
      setEnglishVoiceLoader(false);
    }
  };

  const handlePlayPauseEnglish = () => {
    if (audioRefEnglish.current) {
      if (isPlaying) {
        audioRefEnglish.current.pause();
      } else {
        audioRefEnglish.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStopEnglish = () => {
    if (audioRefEnglish.current) {
      audioRefEnglish.current.pause();
      audioRefEnglish.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleVoiceChange = (selectedVoice: string) => {
    setVoice(selectedVoice);

    if (audioRefEnglish.current) {
      audioRefEnglish.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <div className="relative  mb-20">
      <div className="flex flex-col items-center justify-center h-full px-4 py-8">
        <div className="relative bg-white shadow-lg rounded-lg p-6 border-4 border-orange-500 max-w-4xl w-full text-center">
          {/* Decorative Images */}
          <Clouds />

          {/* Title and Voice Selector */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h2 className="text-orange-500 font-bold text-2xl sm:text-3xl">{language === "en" ? "Your Special Story" : "סיפור מיוחד שלך"}</h2>

            <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
              <AvatarSwapper handleVoiceChange={handleVoiceChange} voice={voice} handleSpeakerClick={handleSpeakerClickEnglish} />
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
          {language === "en" && (
            <>
              <div className={`flex flex-col gap-2 sm:flex-row items-center  mt-6 ${englishVoiceStory ? "justify-between " : "justify-center"} `}>
                <button
                  onClick={handleSpeakerClickEnglish}
                  className="bg-orange-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto mb-4 sm:mb-0"
                  disabled={englishVoiceLoader || isPlaying}
                >
                  {englishVoiceLoader
                    ? language === "en"
                      ? "Generating Audio..."
                      : "יוצר אודיו..."
                    : language === "en"
                    ? "Play My Story"
                    : "נגן את הסיפור שלי"}
                </button>

                {englishVoiceStory && (
                  <div className={`flex gap-4  justify-center items-center w-full sm:w-auto`}>
                    <button
                      onClick={handlePlayPauseEnglish}
                      className="bg-blue-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto"
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>
                    <button onClick={handleStopEnglish} className="bg-red-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto">
                      Stop
                    </button>
                  </div>
                )}
                {englishVoiceStory && (
                  <a href={englishVoiceStory} download={`story-audio.mp3`} className="bg-green-500 text-white font-bold px-4 py-2 rounded shadow-md">
                    Download Audio
                  </a>
                )}
              </div>

              {/* Error and Audio Controls */}
              {englishVoiceStory && (
                <div className="mt-6 flex justify-center">
                  <audio
                    ref={audioRefEnglish}
                    src={englishVoiceStory}
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    controlsList="nodownload"
                  />
                </div>
              )}
            </>
          )}

          {language === "he" && <>hebrew selected</>}
        </div>
      </div>
    </div>
  );
};

export default StoryResponse;
