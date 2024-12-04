/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { generateStory } from "../services/api";
import { useAppStore } from "@/lib/store";
import Link from "next/link";
import { staticStories } from "@/lib/static-data";
import Image from "next/image";

export const KidCarousel = ({ slice }: { slice: number }) => {
  const storiesToShow: any = slice === 0 ? staticStories.slice(0, 7) : staticStories.slice(7);
  const { language, setStory, setLoading }: any = useAppStore();

  const handleGenerateStory = async (text: string) => {
    setStory("");
    setLoading(true);
    try {
      const story = await generateStory(text);
      setStory(story);
    } catch (error: any) {
      setStory(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Carousel className=" lg:w-[70%] w-[60%]">
      <CarouselContent className="-ml-1">
        {storiesToShow.map((key: any, index: any) => {
          console.log(key.image, "key");
          return (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Link href={"/#storyloader"} onClick={() => handleGenerateStory(key.description[language])}>
                <Card>
                  <CardContent className="flex justify-center items-center p-1">
                    <Image src={key.image.src} alt={key.title} width={300} height={300} className="rounded-md lg:h-[340px] h-full w-full" />
                  </CardContent>

                  <CarouselItem className=" text-center h-[50px]">{key.title[language]}</CarouselItem>
                </Card>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
