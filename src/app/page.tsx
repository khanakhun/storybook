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
import Footer from "./global-components/footer";

const Page = () => {
  const { englishStory, hebrewStory, isLoadingEnglish, isLoadingHebrew, language } = useAppStore();

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
      {/* PreStories section */}
      <div id="Stories" className="h-full lg:h-screen  w-full">
        <PreStories />
      </div>
      <div style={{ height: 250 }} />
      {/* First section */}
      <div className=" h-full lg:h-screen w-full flex justify-center items-center">
        <Hero />
      </div>

      {/* Show the story or loader based on the selected language */}
      {language === "en" && (
        <>
          {isLoadingEnglish ? (
            <div id="storyloader" className=" h-full lg:h-screen  w-full flex justify-center items-center">
              <StoryLoader />
            </div>
          ) : (
            englishStory && (
              <div className="   w-full flex justify-center items-center">
                <StoryResponse />
              </div>
            )
          )}

          {/* Background loader for Hebrew */}
          {isLoadingHebrew && (
            <div className="h-full lg:h-screen absolute invisible">
              <StoryLoader />
            </div>
          )}
        </>
      )}

      {language === "he" && (
        <>
          {isLoadingHebrew ? (
            <div id="storyloader" className=" h-full lg:h-screen  w-full flex justify-center items-center">
              <StoryLoader />
            </div>
          ) : (
            hebrewStory && (
              <div className="  w-full flex justify-center items-center">
                <StoryResponse />
              </div>
            )
          )}

          {/* Background loader for English */}
          {isLoadingEnglish && (
            <div className=" h-full lg:h-screen absolute invisible">
              <StoryLoader />
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
};

export default Page;
