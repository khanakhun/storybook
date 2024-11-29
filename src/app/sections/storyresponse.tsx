"use client";

import React, { useState, useRef } from "react";
import bg from "../assets/svg/backgorund.svg";
import leftCloud from "../assets/svg/leftc.svg";
import rightCloud from "../assets/svg/rightc.svg";
import leftTree from "../assets/svg/leftt.svg";
import rightTree from "../assets/svg/rightt.svg";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { formatStory } from "@/lib/formattext";
import { generateSpeech } from "../services/api";

const StoryResponse = () => {
  // custom hooks
  const { story } = useAppStore();

  // state hooks
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voice, setVoice] = useState("alloy");
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // format the story into paragraphs
  const formattedStory = formatStory(story || "");

  // handle the speaker button click (generate speech)
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

  // handle play/pause button click
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

  // handle stop button click
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // handle voice selection change
  const handleVoiceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoice = e.target.value;
    setVoice(selectedVoice);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${bg.src})` }}>
      {/* Main Content Wrapper */}
      <div className="flex flex-col items-center justify-center h-full">
        {/* Main Content Box */}
        <div className="relative bg-white shadow-lg rounded-lg p-6 border-2 border-orange-500 max-w-4xl w-full text-center">
          {/* Clouds on Edges */}
          <div className="absolute -top-12 -left-12">
            <Image src={leftCloud} alt="Left Cloud" width={196} height={90} />
          </div>
          <div className="absolute -top-32 -right-52">
            <Image src={rightCloud} alt="Right Cloud" width={366} height={147} />
          </div>

          {/* Trees on Bottom Edges */}
          <div className="absolute -bottom-20 -left-52">
            <Image src={leftTree} alt="Left Tree" width={307} height={121} />
          </div>
          <div className="absolute -bottom-20 -right-52">
            <Image src={rightTree} alt="Right Tree" width={307} height={121} />
          </div>

          {/* Box Content */}
          <div className="flex justify-between mb-4">
            <div />
            <h2 className="text-orange-500 font-bold text-2xl">Your Story</h2>
            <div className="text-right">
              <label htmlFor="voice-select" className="text-black font-medium mr-2">
                Select Voice:
              </label>
              <select id="voice-select" value={voice} onChange={handleVoiceChange} className="p-2 rounded bg-[#FF7F3E] text-white">
                <option value="alloy">Alloy</option>
                <option value="echo">Echo</option>
                <option value="fable">Fable</option>
                <option value="onyx">Onyx</option>
                <option value="nova">Nova</option>
                <option value="shimmer">Shimmer</option>
              </select>
            </div>
          </div>

          {/* Story Content */}
          <div className="text-gray-800 text-lg leading-relaxed mt-5">{formattedStory}</div>

          {/* Audio Player */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleSpeakerClick}
              className="bg-orange-500 text-white font-bold px-4 py-2 rounded shadow-md"
              disabled={isLoading || !story}
            >
              {isLoading ? "Generating..." : "Generate Speech"}
            </button>
            <div className="flex gap-2 items-center">
              {audioUrl && <audio ref={audioRef} src={audioUrl} controls onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />}
            </div>
          </div>

          {/* Play, Pause, and Stop Controls - Only show if audioUrl is available */}
          {audioUrl && (
            <div className="mt-4">
              <button onClick={handlePlayPause} className="bg-blue-500 text-white font-bold px-4 py-2 rounded shadow-md mr-4" disabled={!audioUrl}>
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button onClick={handleStop} className="bg-red-500 text-white font-bold px-4 py-2 rounded shadow-md" disabled={!audioUrl}>
                Stop
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default StoryResponse;
