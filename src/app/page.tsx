import React from "react";
import Hero from "./sections/hero";
import Image from "next/image";
import Navbar from "./global-components/navbar";
import rightTress from "../app/assets/svg/righttree.svg";
import leftTress from "../app/assets/svg/leftree.svg";
import rightCloud from "../app/assets/svg/rightcloud.svg";
import leftCloud from "../app/assets/svg/leftcloud.svg";
const page = () => {
  return (
    <div>
      <div style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #AEFCFF 100%)" }}>
        <Navbar />
        <div className="flex justify-between">
          <Image src={rightCloud} alt="Hero Image" width={308} height={107} />
          <Image src={leftCloud} alt="Hero Image" width={306} height={125} />
        </div>
        <div className="flex justify-between">
          <Image src={rightTress} alt="Hero Image" width={359} height={407} />
          <Image src={leftTress} alt="Hero Image" width={359} height={407} />
        </div>
      </div>
      <Hero />
    </div>
  );
};

export default page;
