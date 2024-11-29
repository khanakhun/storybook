"use client";

import React, { useState, useRef, useEffect } from "react";
import bg from "../assets/svg/backgorund.svg";
import leftCloud from "../assets/svg/leftc.svg";
import rightCloud from "../assets/svg/rightc.svg";
import leftTree from "../assets/svg/leftt.svg";
import rightTree from "../assets/svg/rightt.svg";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { formatStory } from "@/lib/formattext";
import { generateSpeech } from "../services/api";

const voices = [
  { value: "alloy", label: "Alloy" },
  { value: "echo", label: "Echo" },
  { value: "fable", label: "Fable" },
  { value: "onyx", label: "Onyx" },
  { value: "nova", label: "Nova" },
  { value: "shimmer", label: "Shimmer" },
];

const StoryResponse = () => {
  const { story } = useAppStore();

  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voice, setVoice] = useState(voices[0].value);
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

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoice = e.target.value;
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

  return (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${bg.src})` }}>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative bg-white shadow-lg rounded-lg p-6 border-4 border-orange-500 max-w-4xl w-full text-center">
          <div className="absolute -top-12 -left-12">
            <Image src={leftCloud} alt="Left Cloud" width={196} height={90} />
          </div>
          <div className="absolute -top-32 -right-52">
            <Image src={rightCloud} alt="Right Cloud" width={366} height={147} />
          </div>
          <div className="absolute -bottom-20 -left-52">
            <Image src={leftTree} alt="Left Tree" width={307} height={121} />
          </div>
          <div className="absolute -bottom-20 -right-52">
            <Image src={rightTree} alt="Right Tree" width={307} height={121} />
          </div>

          <div className="flex justify-between mb-4">
            <h2 className="text-orange-500 font-bold text-2xl">Your Story</h2>
            <div className="text-right">
              <label htmlFor="voice-select" className="text-black font-medium mr-2">
                Select Voice:
              </label>
              <select id="voice-select" value={voice} onChange={handleVoiceChange} className="p-2 rounded bg-[#FF7F3E] text-white">
                {voices.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-[#FF7F3E] text-lg leading-relaxed mt-5">{formattedStory}</div>

          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center justify-between ">
              <button
                onClick={handleSpeakerClick}
                className="bg-orange-500 text-white font-bold px-4 py-2 rounded shadow-md"
                disabled={isLoading || !story || isPlaying}
              >
                {isLoading ? "Generating..." : "Generate Speech"}
              </button>
            </div>
            {audioUrl && (
              <div className="flex gap-4 justify-center">
                <button onClick={handlePlayPause} className="bg-blue-500 text-white font-bold px-4 py-2 rounded shadow-md">
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button onClick={handleStop} className="bg-red-500 text-white font-bold px-4 py-2 rounded shadow-md">
                  Stop
                </button>
              </div>
            )}
            {audioUrl && (
              <div className=" flex items-center justify-center">
                <label htmlFor="volume-slider" className="mr-4 text-gray-700 font-medium">
                  Volume:
                </label>
                <input id="volume-slider" type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="w-48" />
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <div className="flex gap-2 items-center justify-center w-full mt-10">
            {audioUrl && <audio ref={audioRef} src={audioUrl} controls onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryResponse;
