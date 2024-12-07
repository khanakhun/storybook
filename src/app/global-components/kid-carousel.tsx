/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { generateStory } from "../services/api";
import { useAppStore } from "@/lib/store";
import Link from "next/link";
import { staticStories } from "@/lib/static-data";
import Image from "next/image";
import { toast } from "react-toastify";

export const KidCarousel = () => {
  const { setStoryImage, setHebrewStory, setEnglishStory, setHebrewLoading, setEnglishLoading, isLoadingEnglish, isLoadingHebrew, language } =
    useAppStore();

  const handleGenerateStory = useCallback(
    async (storyPrompt: string, image: string) => {
      if (!storyPrompt.trim()) {
        toast("Please select or enter a valid story prompt!");
        return;
      }

      if (isLoadingEnglish || isLoadingHebrew) {
        toast("A story is already being generated, please wait.");
        return;
      }
      setStoryImage(image);
      // Start loading for both languages
      setEnglishLoading(true);
      setHebrewLoading(true);

      try {
        if (language === "en") {
          // Fetch English story and update its loading state
          const englishStory = await generateStory(storyPrompt, "en");
          setEnglishStory(englishStory);
          setEnglishLoading(false); // Stop English loading

          // Fetch Hebrew story in the background
          const hebrewStory = await generateStory(storyPrompt, "he");
          setHebrewStory(hebrewStory);
          setHebrewLoading(false); // Stop Hebrew loading
        } else {
          // Fetch Hebrew story and update its loading state
          const hebrewStory = await generateStory(storyPrompt, "he");
          setHebrewStory(hebrewStory);
          setHebrewLoading(false); // Stop Hebrew loading

          // Fetch English story in the background
          const englishStory = await generateStory(storyPrompt, "en");
          setEnglishStory(englishStory);
          setEnglishLoading(false); // Stop English loading
        }
      } catch (error: any) {
        // Handle errors and stop loaders
        toast.error("An error occurred while generating the story.");
        setEnglishStory(error.message || "Error generating English story.");
        setHebrewStory(error.message || "Error generating Hebrew story.");
        setEnglishLoading(false);
        setHebrewLoading(false);
      }
    },
    [language, isLoadingEnglish, isLoadingHebrew, setEnglishStory, setHebrewStory, setEnglishLoading, setHebrewLoading, setStoryImage]
  );

  return (
    <Carousel className="w-[60%]">
      <CarouselContent className="-ml-1">
        {staticStories.map((story: any, index: number) => (
          <CarouselItem key={index} className="pl-4 pr-4 md:basis-1/2 lg:basis-1/3">
            <Link href={"/#storyloader"} onClick={() => handleGenerateStory(story.title[language], story.image.src)}>
              <Card>
                <CardContent className="flex justify-center items-center p-1">
                  <Image src={story.image.src} alt={story.title[language]} width={300} height={300} className="rounded-md h-full w-full" />
                </CardContent>
                <div className="text-start text-red-500 h-[50px]">{story.title[language]}</div>
                <div className="text-start text-sm h-[100px]">{story.description[language]}</div>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
