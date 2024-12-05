"use client";
import React, { useEffect } from "react";
import Hero from "./sections/hero";
import Navbar from "./global-components/navbar";
import { ToastContainer } from "react-toastify";
import StoryLoader from "./global-components/storyLoader";
import StoryResponse from "./sections/storyresponse";
import { useAppStore } from "@/lib/store";
import AOS from "aos";
import "aos/dist/aos.css";
import PreStories from "./sections/pre-stories";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { story, isLoading } = useAppStore();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-out-back",
    });
    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={5000} />
      <Navbar />
      <div className="h-screen w-full flex justify-center items-center">
        <Hero />
      </div>
      {isLoading && (
        <div id="storyloader" className="h-screen w-full flex justify-center items-center">
          <StoryLoader />
        </div>
      )}
      {story && (
        <div className="h-screen w-full flex justify-center items-center">
          <StoryResponse />
        </div>
      )}
      <div id="Listen" className="h-screen w-full">
        <PreStories />
      </div>
    </div>
  );
};

export default page;
