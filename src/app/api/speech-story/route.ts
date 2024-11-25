import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body to extract the input text and voice parameters
    const { input, voice = "alloy" } = await request.json();

    // Check if input text exists
    if (!input) {
      return NextResponse.json({ message: "Please provide the text to convert to speech." }, { status: 400 });
    }

    // Ensure OPENAI_API_KEY is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ message: "API key is missing!" }, { status: 500 });
    }

    // Make a request to the OpenAI audio speech API
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "tts-1", // Specify the TTS model (you can choose between "tts-1" or "tts-1-hd")
        input: input,
        voice: voice, // You can set the voice to "alloy", "echo", "fable", etc.
      }),
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          message: errorData.error?.message || "Failed to generate speech. Please try again later.",
        },
        { status: response.status }
      );
    }

    // Convert the audio to a buffer
    const audioBuffer = await response.arrayBuffer();

    // Create a blob from the audio buffer and return the audio URL
    const audioBlob = new Blob([audioBuffer], { type: "audio/mp3" });
    const audioUrl = URL.createObjectURL(audioBlob);

    // Return the audio URL in the response
    return NextResponse.json({ audioUrl });
  } catch (error) {
    console.error("Error calling OpenAI Audio API:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
