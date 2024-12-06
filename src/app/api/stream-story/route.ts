import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    // Extract parameters from query string or use defaults
    // const { searchParams } = new URL(request.url);
    // const text = searchParams.get('text') || 'the quick brown chicken jumped over the lazy dogs';
    // const voice = searchParams.get('voice') as OpenAI.Audio.Speech.SpeechCreateParams['voice'] || 'alloy';

    const { text, voice } = await request.json();
    // Create the speech stream
    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice,
      input: text,
      // Optional: you can add response_format if needed
      // response_format: 'mp3' // Default is mp3
    });

    // Return the stream directly
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Streaming error:', error);
    return NextResponse.json(
      { error: 'Failed to generate speech stream' }, 
      { status: 500 }
    );
  }
}