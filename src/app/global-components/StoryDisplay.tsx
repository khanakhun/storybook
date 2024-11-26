import React, { useState, useRef } from "react";
import { FcSpeaker } from "react-icons/fc";
import { generateSpeech } from "../services/api";
import { FaCirclePause } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaStopCircle } from "react-icons/fa";

interface StoryDisplayProps {
  story: string;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voice, setVoice] = useState("alloy");
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatStory = (story: string) => {
    const paragraphs = story.split("\n").filter((para) => para.trim() !== "");
    return paragraphs.map((para, index) => (
      <p key={index} className="text-lg text-white mb-4">
        {para}
      </p>
    ));
  };

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

  const handleVoiceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoice = e.target.value;
    setVoice(selectedVoice);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="p-6 text-white rounded-lg shadow-lg  mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-white">Your Story</h2>
        {isLoading && (
          <div className="flex flex-col items-center">
            <DotLottieReact className="w-auto h-32" src={"/voice.lottie"} loop autoplay />
            <p className="animate-bounce">Hang tight, we&apos;re making your words magical! 🎤✨</p>
          </div>
        )}

        {!isLoading && (
          <div className="space-x-3">
            <button
              onClick={handleSpeakerClick}
              className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-all duration-200"
              title="Generate Speech"
            >
              <FcSpeaker size={24} />
            </button>
            {audioUrl && (
              <>
                <button
                  onClick={handlePlayPause}
                  className={`p-3 bg-green-500 rounded-full text-white hover:bg-green-600 transition-all duration-200 ${
                    isPlaying ? "bg-red-500" : ""
                  }`}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <FaCirclePause size={24} /> : <FaPlayCircle size={24} />}
                </button>
                <button
                  onClick={handleStop}
                  className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 transition-all duration-200"
                  title="Stop"
                >
                  <FaStopCircle size={24} />
                </button>
              </>
            )}
          </div>
        )}

        <div className="mt-4 mb-6 text-right">
          <label htmlFor="voice-select" className="text-white font-medium mr-2">
            Select Voice:
          </label>
          <select
            id="voice-select"
            value={voice}
            onChange={handleVoiceChange} // Trigger API call on voice change
            className="p-2 rounded bg-white text-black"
          >
            <option value="alloy">Alloy</option>
            <option value="echo">Echo</option>
            <option value="fable">Fable</option>
            <option value="onyx">Onyx</option>
            <option value="nova">Nova</option>
            <option value="shimmer">Shimmer</option>
          </select>
        </div>
      </div>

      <div className="text-white mb-6">{formatStory(story)}</div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {audioUrl && <audio ref={audioRef} src={audioUrl} controls className="w-full mt-4" />}
    </div>
  );
};

export default StoryDisplay;
