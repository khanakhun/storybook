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
      {/* section 1 */}
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <Hero />
        </div>
      </div>
      {/* section 2 */}
      {isLoading && (
        <div>
          <StoryLoader />
        </div>
      )}
      {/* section 3 */}
      {story && <StoryResponse />}
      {/* section 4 */}
      <PreStories />
      <div className="h-[100px]" />
    </div>
  );
};

export default page;
