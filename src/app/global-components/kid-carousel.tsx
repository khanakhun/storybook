"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { generateStory } from "../services/api";
import { useAppStore } from "@/lib/store";
import Link from "next/link";

export function KidCarousel() {
  const lottieAnimations = ["/chicken.lottie", "/panda.lottie", "loader.lottie", "/lion.lottie", "/fish.lottie"];
  const { language, setStory, setLoading } = useAppStore();

  const handleGenerateStory = async (text: string) => {
    setStory("");
    setLoading(true);
    try {
      const story = await generateStory(text, language);
      setStory(story);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStory(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStoryText = (key: string) => {
    switch (key) {
      case "/chicken.lottie":
        return "a magical chicken story.";
      case "/panda.lottie":
        return "a heartwarming panda tale.";
      case "loader.lottie":
        return "adventurous world";
      case "/lion.lottie":
        return "epic story about a brave lion.";
      case "/fish.lottie":
        return "fascinating underwater story about a fish.";
      default:
        return "wonderful story.";
    }
  };

  return (
    <div className="w-full bg-blue-400 py-10 ">
      <h2 className="text-center text-white text-2xl md:text-4xl font-bold mb-6">Discover Magical Stories</h2>
      <div className="flex justify-center p-20">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent className="-ml-1">
            {lottieAnimations.map((key, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <DotLottieReact className="w-full h-full" src={key} loop autoplay />
                    </CardContent>
                    <Link href={"/#storyloader"}>
                      <button
                        onClick={() => handleGenerateStory(getStoryText(key))}
                        className="mt-4 px-4 py-2 sm:px-6 sm:py-2 bg-[#FF7F3E] hover:bg-[#FF7F3E] text-white font-bold rounded-lg shadow-md w-full"
                      >
                        Listen Now
                      </button>
                    </Link>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
