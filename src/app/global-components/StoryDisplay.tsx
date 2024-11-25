import React, { useState, useEffect } from "react";
import { FcSpeaker } from "react-icons/fc";
import { generateSpeech } from "../services/api";

interface StoryDisplayProps {
  story: string;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [speechResponse, setSpeechResponse] = useState<any>(null); // Store the speech response
  const [voice, setVoice] = useState("alloy"); // State to manage selected voice
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // To store the audio URL

  const formatStory = (story: string) => {
    const paragraphs = story.split("\n").filter((para) => para.trim() !== "");
    return paragraphs.map((para, index) => (
      <p key={index} className="text-lg text-white mb-4">
        {para}
      </p>
    ));
  };

  // Handle click on the speaker icon
  const handleSpeakerClick = async () => {
    setIsLoading(true); // Show loading state
    try {
      const response = await generateSpeech(story, voice); // Call the generateSpeech function
      setSpeechResponse(response); // Store the speech response (e.g., audio URL)
    } catch (error) {
      console.error("Error generating speech:", error);
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  // When speech response is received, create an object URL for the blob
  useEffect(() => {
    if (speechResponse?.audioUrl) {
      // Convert blob URL into a playable object URL
      const blobUrl = speechResponse.audioUrl; // Get the blob URL
      const audioBlob = new Blob([blobUrl], { type: "audio/mpeg" }); // Create a Blob object
      const objectUrl = URL.createObjectURL(audioBlob); // Generate object URL from Blob
      setAudioUrl(objectUrl); // Set the audio URL in the state
    }
  }, [speechResponse]);

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white mb-4">Your Story:</h2>
        <FcSpeaker className="w-8 h-8 cursor-pointer" onClick={handleSpeakerClick} />
      </div>

      {/* Option to change voice */}
      <div className="mt-4 text-white">
        <label htmlFor="voice-select" className="mr-2">
          Select Voice:
        </label>
        <select id="voice-select" value={voice} onChange={(e) => setVoice(e.target.value)} className="p-2 rounded bg-gray-800 text-white">
          <option value="alloy">Alloy</option>
          <option value="anotherVoice">Another Voice</option>
          {/* Add more voice options as needed */}
        </select>
      </div>

      <div className="text-gray-800">{formatStory(story)}</div>

      {/* Show loading state or response */}
      {isLoading && <p className="text-white">Loading speech...</p>}

      {/* If audio URL is available, render the audio player */}
      {audioUrl && (
        <div className="mt-4">
          {/* Render the speech response here */}
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default StoryDisplay;
