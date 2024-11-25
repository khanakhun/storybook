import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { prompt } = await request.json();

    // Check if prompt exists
    if (!prompt) {
      return NextResponse.json({ message: "Please provide a prompt to generate a story!" }, { status: 400 });
    }

    // Ensure OPENAI_API_KEY is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ message: "API key is missing!" }, { status: 500 });
    }

    // Make a call to OpenAI's chat completion API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // Or use a different model like "gpt-3.5-turbo"
        messages: [
          { role: "system", content: "You are a friendly storyteller." },
          { role: "user", content: `Create a fun and magical story about ${prompt}.` },
        ],
        temperature: 0.7,
      }),
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          message: errorData.error?.message || "Failed to generate story. Please try again later.",
        },
        { status: response.status }
      );
    }

    // Extract and return the message from OpenAI's response
    const data = await response.json();
    const message = data.choices[0]?.message?.content ?? "Sorry, I couldn't generate a story. Please try again!";

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
