"use client";

import React, { useState, useRef, useEffect } from "react";
import leftCloud from "../assets/svg/leftc.svg";
import rightCloud from "../assets/svg/rightc.svg";
import leftTree from "../assets/svg/leftt.svg";
import rightTree from "../assets/svg/rightt.svg";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { formatStory } from "@/lib/formattext";
import { generateSpeech } from "../services/api";
import AvatarSwapper from "../global-components/AvatarSwapper";
import Typewriter from "../global-components/TypeWritter";

const StoryResponse = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { story , language }: any = useAppStore();

  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voice, setVoice] = useState("alloy");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Default volume at max
  const [error, setError] = useState<string | null>(null);

  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const formattedStory = formatStory(story || "");
  const handleSpeakerClick = async () => {
    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const response = await generateSpeech(story, voice);
      if (!response.audioUrl) {
        throw new Error("Audio URL not found in the API response.");
      }

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
      setError(`Error generating speech: ${error.message}`);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleVoiceChange = (selectedVoice: any) => {
    setVoice(selectedVoice);

    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTextToSpeech = async () => {

    setIsLoading(true);

    try {
      // Send request to our API route
      const response = await fetch('/api/stream-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: story,
          voice: voice, 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      // Convert response to blob
      const blob = await response.blob();
      
      // Create a URL for the blob
      const audioUrl = URL.createObjectURL(blob);
      
      // Set the audio source and play
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Error generating speech:', error);
      alert('Failed to generate speech');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative h-screen  ">
      <div className="flex flex-col items-center justify-center h-full px-4 py-8">
        <div className="relative bg-white shadow-lg rounded-lg p-6 border-4 border-orange-500 max-w-4xl w-full text-center">
          {/* Images Positioning */}
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
            <h2 className="text-orange-500 font-bold text-2xl sm:text-3xl">{ language == "en" ? "Your Special Story" : "סיפור מיוחד שלך"}</h2>
            <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
              <AvatarSwapper handleVoiceChange={handleVoiceChange} />
            </div>
          </div>

          {/* Story Text */}
          {formattedStory && (
            <div className="text-[#FF7F3E] text-lg sm:text-xl leading-relaxed mt-5 mb-6">
              <Typewriter text={formattedStory[0]?.props?.children} delay={50} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
            <button
              onClick={handleTextToSpeech}
              className="bg-orange-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto mb-4 sm:mb-0"
              disabled={isLoading || !story || isPlaying}
            >
              {isLoading ? (language == "en" ? "Story Time Begins!" : "זמן סיפור מתחיל!") : (language == "en" ? "Play My Story" : "נגן את הסיפור שלי")}
             
            </button>

            {audioUrl && (
              <div className="flex gap-4 justify-center items-center w-full sm:w-auto">
                <button onClick={handlePlayPause} className="bg-blue-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto">
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button onClick={handleStop} className="bg-red-500 text-white font-bold px-4 py-2 rounded shadow-md w-full sm:w-auto">
                  Stop
                </button>
              </div>
            )}

            {audioUrl && (
              <div className="flex items-center justify-center w-full sm:w-auto mt-4 sm:mt-0">
                <label htmlFor="volume-slider" className="mr-4 text-gray-700 font-medium">
                  Volume:
                </label>
                <input
                  id="volume-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-48 sm:w-64"
                />
              </div>
            )}
          </div>

          {/* Error and Audio Controls */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <div className="flex gap-2 items-center justify-center w-full mt-6">
            { <audio ref={audioRef}  controls onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryResponse;
