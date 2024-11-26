"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function KidCarousel() {
  const lottieAnimations = ["/chicken.lottie", "/lion.lottie", "/panda.lottie", "fish.lottie", "/chicken.lottie"];
  return (
    <Carousel className="w-full max-w-lg">
      <CarouselContent className="-ml-1">
        {lottieAnimations.map((key, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <DotLottieReact className="w-full h-full" src={key} loop autoplay />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
