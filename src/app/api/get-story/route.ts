import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI SDK
const openai = new OpenAI();

export async function POST(request: Request) {
  try {
    // Parse the request body to extract the prompt and language
    const { prompt } = await request.json();

    // Validate the input prompt
    if (!prompt) {
      return NextResponse.json({ message: "Please provide a prompt to generate a story!" }, { status: 400 });
    }

    // Ensure OPENAI_API_KEY is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ message: "API key is missing!" }, { status: 500 });
    }
    const prompter = `Create a fun and magical short story of 200 words about ${prompt} in both English and Hebrew language. 
    Please return the story in JSON format with two fields:
    - "english": The story in English.
    - "hebrew": The story translated into Hebrew.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a friendly storyteller." },
        {
          role: "user",
          content: prompter,
        },
      ],
      temperature: 0.7, // Adjust randomness of the story
    });

    // Extract the message from the OpenAI response
    const message = completion.choices[0]?.message?.content ?? "Sorry, I couldn't generate a story. Please try again!";

    // Return the generated story as a response
    return NextResponse.json({ message });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);

    // Return an internal server error message
    return NextResponse.json({ message: "Internal server error. Please try again later." }, { status: 500 });
  }
}
