import Image from "next/image";
import React from "react";
import leftCloud from "../assets/svg/leftc.svg";
import rightCloud from "../assets/svg/rightc.svg";
import leftTree from "../assets/svg/leftt.svg";
import rightTree from "../assets/svg/rightt.svg";
const Clouds = () => {
  return (
    <div>
      {" "}
      <div className="absolute -top-12 -left-12 hidden lg:block">
        <Image src={leftCloud} alt="Left Cloud" width={196} height={90} />
      </div>
      <div className="absolute -top-32 -right-32 hidden lg:block">
        <Image src={rightCloud} alt="Right Cloud" width={366} height={147} />
      </div>
      <div className="absolute -bottom-20 -left-52 hidden lg:block">
        <Image src={leftTree} alt="Left Tree" width={307} height={121} />
      </div>
      <div className="absolute -bottom-20 -right-32 hidden lg:block">
        <Image src={rightTree} alt="Right Tree" width={307} height={121} />
      </div>
    </div>
  );
};

export default Clouds;
