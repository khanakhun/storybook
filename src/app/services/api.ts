import axios from "axios";

// Generic function to handle API requests
export const generateStory = async (prompt: string, language: string): Promise<string> => {
  try {
    const res = await axios.post("/api/get-story", { prompt, language });

    if (res.status === 200 && res.data.message) {
      return res.data.message;
    }
    return "Sorry, but I didn't understand your message. Could you please provide more details?";
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("An error occurred. Please try again.");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateSpeech = async (input: string, voice: string): Promise<any> => {
  try {
    const res = await axios.post("/api/speech-story", { input, voice });

    if (res.status === 200 && res.data) {
      return res.data; // Return the response data (presumably speech-related data)
    }
    return "Sorry, the speech generation failed. Please try again.";
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("An error occurred with speech generation. Please try again.");
  }
};
