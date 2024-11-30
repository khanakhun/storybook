"use client";
import React, { useEffect } from "react";
import Hero from "./sections/hero";
import Image from "next/image";
import Navbar from "./global-components/navbar";
import rightTress from "../app/assets/svg/righttree.svg";
import leftTress from "../app/assets/svg/leftree.svg";
import rightCloud from "../app/assets/svg/rightcloud.svg";
import leftCloud from "../app/assets/svg/leftcloud.svg";
import { ToastContainer } from "react-toastify";
import StoryLoader from "./global-components/storyLoader";
import StoryResponse from "./sections/storyresponse";
import { useAppStore } from "@/lib/store";
import AOS from "aos";
import "aos/dist/aos.css";
import PromoBanner from "./sections/promobanner";
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
      <div style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #AEFCFF 100%)" }}>
        <Navbar />
        <div className="flex justify-between items-center md:flex-row flex-col">
          <div>
            <Image src={rightCloud} alt="Right Cloud" width={308} height={107} className="justify-self-end" />
            <Image src={rightTress} alt="Right Tree" width={359} height={407} className="justify-self-end" />
          </div>
          <div>
            <Hero />
          </div>
          <div>
            <Image src={leftCloud} alt="Left Cloud" width={306} height={125} className="justify-self-start" />
            <Image src={leftTress} alt="Left Tree" width={359} height={407} className="justify-self-start" />
          </div>
        </div>
      </div>
      {isLoading && <StoryLoader />}
      {story && <StoryResponse />}
      <PreStories />
      <PromoBanner />
    </div>
  );
};

export default page;
