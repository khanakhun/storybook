"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { generateSpeech } from "../services/api";
import AvatarSwapper from "../global-components/AvatarSwapper";
import Typewriter from "../global-components/TypeWritter";
import Clouds from "../static-components/clouds";
import { toast } from "react-toastify";

const StoryResponse = () => {
  const {
    setHebrewVoiceStory,
    setHebrewVoiceLoader,
    hebrewVoiceStory,
    hebrewVoiceLoader,
    setEnglishVoiceLoader,
    englishVoiceLoader,
    englishVoiceStory,
    setEnglishVoiceStory,
    englishStory,
    hebrewStory,
    language,
    storyImage,
  } = useAppStore();

  const [voice, setVoice] = useState("alloy");
  const [isPlayingEnglish, setIsPlayingEnglish] = useState(false);
  const [isPlayingHebrew, setIsPlayingHebrew] = useState(false);

  const audioRefEnglish = useRef<HTMLAudioElement | null>(null);
  const audioRefHebrew = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Clean up old audio URLs
    return () => {
      if (englishVoiceStory) URL.revokeObjectURL(englishVoiceStory);
      if (hebrewVoiceStory) URL.revokeObjectURL(hebrewVoiceStory);
    };
  }, [englishVoiceStory, hebrewVoiceStory]);

  const handleGenerateVoice = useCallback(async () => {
    if (!hebrewStory || !englishStory) {
      toast("Just a moment! Your magical story is almost ready!");
      return;
    }
    setHebrewVoiceLoader(true);
    setEnglishVoiceLoader(true);

    try {
      if (language === "en") {
        // Fetch English voice first
        const responseEn = await generateSpeech(englishStory, voice);
        if (responseEn.audioUrl.startsWith("blob:")) {
          const blobUrl = responseEn.audioUrl;
          const responseBlob = await fetch(blobUrl);
          const blob = await responseBlob.blob();
          const audioUrl = URL.createObjectURL(blob);
          setEnglishVoiceStory(audioUrl);
        } else {
          setEnglishVoiceStory(responseEn.audioUrl);
        }
        setEnglishVoiceLoader(false);

        // Fetch Hebrew voice in the background
        const responseHe = await generateSpeech(hebrewStory, voice);
        if (responseHe.audioUrl.startsWith("blob:")) {
          const blobUrl = responseHe.audioUrl;
          const responseBlob = await fetch(blobUrl);
          const blob = await responseBlob.blob();
          const audioUrl = URL.createObjectURL(blob);
          setHebrewVoiceStory(audioUrl);
        } else {
          setHebrewVoiceStory(responseHe.audioUrl);
        }
        setHebrewVoiceLoader(false);
      } else if (language === "he") {
        // Fetch Hebrew voice first
        const responseHe = await generateSpeech(hebrewStory, voice);
        if (responseHe.audioUrl.startsWith("blob:")) {
          const blobUrl = responseHe.audioUrl;
          const responseBlob = await fetch(blobUrl);
          const blob = await responseBlob.blob();
          const audioUrl = URL.createObjectURL(blob);
          setHebrewVoiceStory(audioUrl);
        } else {
          setHebrewVoiceStory(responseHe.audioUrl);
        }
        setHebrewVoiceLoader(false);

        // Fetch English voice in the background
        const responseEn = await generateSpeech(englishStory, voice);
        if (responseEn.audioUrl.startsWith("blob:")) {
          const blobUrl = responseEn.audioUrl;
          const responseBlob = await fetch(blobUrl);
          const blob = await responseBlob.blob();
          const audioUrl = URL.createObjectURL(blob);
          setEnglishVoiceStory(audioUrl);
        } else {
          setEnglishVoiceStory(responseEn.audioUrl);
        }
        setEnglishVoiceLoader(false);
      }
    } catch (error) {
      console.error("Error generating speech:", error);
      setEnglishVoiceLoader(false);
      setHebrewVoiceLoader(false);
    }
  }, [englishStory, hebrewStory, language, setEnglishVoiceLoader, setEnglishVoiceStory, setHebrewVoiceLoader, setHebrewVoiceStory, voice]);

  // const handleSpeakerClickEnglish = async () => {
  //   setEnglishVoiceLoader(true);
  //   setEnglishVoiceStory(null);

  //   try {
  //     console.log(englishStory, "englishStory");
  //     const response = await generateSpeech(englishStory, voice);
  //     if (!response.audioUrl) {
  //       throw new Error(language === "en" ? "Audio URL not found." : "לא נמצאה כתובת אודיו.");
  //     }

  //     // Handle blob or direct audio URL
  //     if (response.audioUrl.startsWith("blob:")) {
  //       const blobUrl = response.audioUrl;
  //       const responseBlob = await fetch(blobUrl);
  //       const blob = await responseBlob.blob();
  //       const audioUrl = URL.createObjectURL(blob);
  //       setEnglishVoiceStory(audioUrl);
  //     } else {
  //       setEnglishVoiceStory(response.audioUrl);
  //     }

  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     console.log(error);
  //   } finally {
  //     setEnglishVoiceLoader(false);
  //   }
  // };

  // const handleSpeakerClickHebrew = async () => {
  //   setHebrewVoiceLoader(true);
  //   setHebrewVoiceStory(null);
  //   try {
  //     console.log(hebrewStory, "hebrewStory");
  //     const response = await generateSpeech(hebrewStory, voice);
  //     if (!response.audioUrl) {
  //       throw new Error(language === "en" ? "Audio URL not found." : "לא נמצאה כתובת אודיו.");
  //     }

  //     // Handle blob or direct audio URL
  //     if (response.audioUrl.startsWith("blob:")) {
  //       const blobUrl = response.audioUrl;
  //       const responseBlob = await fetch(blobUrl);
  //       const blob = await responseBlob.blob();
  //       const audioUrl = URL.createObjectURL(blob);
  //       setHebrewVoiceStory(audioUrl);
  //     } else {
  //       setHebrewVoiceStory(response.audioUrl);
  //     }

  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     console.log(error);
  //   } finally {
  //     setHebrewVoiceLoader(false);
  //   }
  // };
  const handlePlayPauseEnglish = () => {
    if (audioRefEnglish.current) {
      if (isPlayingEnglish) {
        audioRefEnglish.current.pause();
      } else {
        audioRefEnglish.current.play();
      }
      setIsPlayingEnglish(!isPlayingEnglish);
    }
  };
  const handlePlayPauseHebrew = () => {
    if (audioRefHebrew.current) {
      if (isPlayingEnglish) {
        audioRefHebrew.current.pause();
      } else {
        audioRefHebrew.current.play();
      }
      setIsPlayingHebrew(!isPlayingEnglish);
    }
  };
  const handleStopEnglish = () => {
    if (audioRefEnglish.current) {
      audioRefEnglish.current.pause();
      audioRefEnglish.current.currentTime = 0;
      setIsPlayingEnglish(false);
    }
  };
  const handleStopHebrew = () => {
    if (audioRefHebrew.current) {
      audioRefHebrew.current.pause();
      audioRefHebrew.current.currentTime = 0;
      setIsPlayingHebrew(false);
    }
  };
  const handleVoiceChange = (selectedVoice: string) => {
    setVoice(selectedVoice);

    if (audioRefEnglish.current) {
      audioRefEnglish.current.pause();
      setIsPlayingEnglish(false);
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
              <AvatarSwapper handleVoiceChange={handleVoiceChange} voice={voice} handleSpeakerClick={handleGenerateVoice} />
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
                  onClick={handleGenerateVoice}
                  className="bg-orange-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto mb-4 sm:mb-0"
                  disabled={englishVoiceLoader || isPlayingEnglish}
                >
                  {englishVoiceLoader
                    ? language === "en"
                      ? "Generating Audio..."
                      : "יוצר אודיו..."
                    : language === "en"
                    ? "Play My Story"
                    : "נגן את הסיפור שלי"}
                </button>

                {!englishVoiceLoader && englishVoiceStory && (
                  <div className={`flex gap-4  justify-center items-center w-full sm:w-auto`}>
                    <button
                      onClick={handlePlayPauseEnglish}
                      className="bg-blue-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto"
                    >
                      {isPlayingEnglish ? "Pause" : "Play"}
                    </button>
                    <button onClick={handleStopEnglish} className="bg-red-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto">
                      Stop
                    </button>
                  </div>
                )}
                {!englishVoiceLoader && englishVoiceStory && (
                  <a href={englishVoiceStory} download={`story-audio.mp3`} className="bg-green-500 text-white font-bold px-4 py-2 rounded shadow-md">
                    Download Audio
                  </a>
                )}
              </div>

              {/* Error and Audio Controls */}
              {!englishVoiceLoader && englishVoiceStory && (
                <div className="mt-6 flex justify-center">
                  <audio
                    ref={audioRefEnglish}
                    src={englishVoiceStory}
                    controls
                    onPlay={() => setIsPlayingEnglish(true)}
                    onPause={() => setIsPlayingEnglish(false)}
                    controlsList="nodownload"
                  />
                </div>
              )}
            </>
          )}

          {language === "he" && (
            <>
              <div className={`flex flex-col gap-2 sm:flex-row items-center  mt-6 ${hebrewVoiceStory ? "justify-between " : "justify-center"} `}>
                <button
                  onClick={handleGenerateVoice}
                  className="bg-orange-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto mb-4 sm:mb-0"
                  disabled={hebrewVoiceLoader || isPlayingHebrew}
                >
                  {hebrewVoiceLoader
                    ? language === "en"
                      ? "Generating Audio..."
                      : "יוצר אודיו..."
                    : language === "en"
                    ? "Play My Story"
                    : "נגן את הסיפור שלי"}
                </button>

                {!hebrewVoiceLoader && hebrewVoiceStory && (
                  <div className={`flex gap-4  justify-center items-center w-full sm:w-auto`}>
                    <button onClick={handlePlayPauseHebrew} className="bg-blue-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto">
                      {isPlayingEnglish ? "Pause" : "Play"}
                    </button>
                    <button onClick={handleStopHebrew} className="bg-red-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto">
                      Stop
                    </button>
                  </div>
                )}
                {!hebrewVoiceLoader && hebrewVoiceStory && (
                  <a href={hebrewVoiceStory} download={`story-audio.mp3`} className="bg-green-500 text-white font-bold px-4 py-2 rounded shadow-md">
                    Download Audio
                  </a>
                )}
              </div>

              {/* Error and Audio Controls */}
              {!hebrewVoiceLoader && hebrewVoiceStory && (
                <div className="mt-6 flex justify-center">
                  <audio
                    ref={audioRefHebrew}
                    src={hebrewVoiceStory}
                    controls
                    onPlay={() => setIsPlayingEnglish(true)}
                    onPause={() => setIsPlayingEnglish(false)}
                    controlsList="nodownload"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryResponse;
