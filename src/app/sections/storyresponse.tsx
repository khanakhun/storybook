import React from "react";
import bg from "../assets/svg/backgorund.svg";
import leftCloud from "../assets/svg/leftc.svg";
import rightCloud from "../assets/svg/rightc.svg";
import leftTree from "../assets/svg/leftt.svg";
import rightTree from "../assets/svg/rightt.svg";
import Image from "next/image";

const StoryResponse = () => {
  return (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${bg.src})` }}>
      {/* Main Content Wrapper */}
      <div className="flex flex-col items-center justify-center h-full">
        {/* Title */}

        {/* Main Content Box */}
        <div className="relative bg-white shadow-lg rounded-lg p-6 border-2 border-orange-500 max-w-4xl w-full text-center">
          {/* Clouds on Edges */}
          <div className="absolute -top-12 -left-12">
            <Image src={leftCloud} alt="Left Cloud" width={196} height={90} />
          </div>
          <div className="absolute -top-32 -right-52">
            <Image src={rightCloud} alt="Right Cloud" width={366} height={147} />
          </div>

          {/* Trees on Bottom Edges */}
          <div className="absolute -bottom-20 -left-52">
            <Image src={leftTree} alt="Left Tree" width={307} height={121} />
          </div>
          <div className="absolute -bottom-20 -right-52">
            <Image src={rightTree} alt="Right Tree" width={307} height={121} />
          </div>

          {/* Box Content */}
          <div className="flex justify-between">
            <div />
            <h2 className="text-orange-500 font-bold text-2xl ">Your Story</h2>
            <div className="text-right">
              <label htmlFor="voice-select" className="text-black font-medium mr-2">
                Select Voice:
              </label>
              <select
                id="voice-select"
                // value={voice}
                // onChange={handleVoiceChange} // Trigger API call on voice change
                className="p-2 rounded bg-[#FF7F3E] text-white"
              >
                <option value="alloy">Alloy</option>
                <option value="echo">Echo</option>
                <option value="fable">Fable</option>
                <option value="onyx">Onyx</option>
                <option value="nova">Nova</option>
                <option value="shimmer">Shimmer</option>
              </select>
            </div>
          </div>
          <p className="text-gray-800 text-md leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis beatae eius nisi laborum ut cupiditate illum tempore itaque dicta rem
            veritatis iure molestias, nam eveniet, quam, cum tenetur voluptates. Fuga numquam reiciendis nemo aliquid alias sunt non quidem unde
            blanditiis natus, porro officia, nulla tempora debitis optio cum eum nihil. Magnam non veniam placeat fuga enim commodi, culpa ratione
            suscipit amet quasi velit totam porro est a optio obcaecati rem aliquid accusamus dolorem? Esse a enim consectetur iste odit voluptatibus?
            Enim suscipit omnis iusto fugit dignissimos cumque aspernatur cum magni vitae! Repudiandae perspiciatis recusandae nisi ex fuga vero saepe
            molestiae harum sequi totam omnis provident voluptates doloremque, illo dignissimos dolore cupiditate, assumenda dicta amet! Expedita
            veritatis dolor a ratione iusto tempora ipsum non soluta iure accusantium, ducimus, rem modi! Reiciendis deserunt nulla magni at
            recusandae modi cum iure vero, odio, sint saepe, accusantium dolorem soluta placeat sit expedita. Voluptate hic nam eum alias natus.
            Adipisci sed fuga nisi aspernatur accusantium in perspiciatis modi, suscipit repellendus expedita perferendis ipsam at autem architecto
            sunt aliquam ut amet. Vitae qui quia reiciendis blanditiis nobis porro, possimus pariatur laborum velit! Error, repellendus voluptatum
            voluptates reiciendis perspiciatis harum? Dolores possimus nostrum, sint voluptatibus voluptatum consectetur omnis dolore! Sequi sed nobis
            maiores, atque recusandae dolores minima ipsa aliquid. Magnam debitis ad minus id laborum accusantium maxime officia corrupti praesentium
            aperiam nihil sit deleniti, nam qui tenetur doloremque repudiandae eius voluptatibus! Enim deleniti, ad modi repellendus dolore laborum
            impedit est nobis facere fuga possimus doloribus itaque obcaecati voluptatum iure a maxime accusantium autem tempora ipsa. Iste ea at
            dignissimos suscipit eligendi ducimus minima neque molestias consequatur quibusdam! Laudantium corporis ratione dolores maiores nihil
            obcaecati sunt architecto iusto tempora aperiam vitae nam quos, reprehenderit est unde. Iste deserunt dolor accusamus unde eveniet
            deleniti enim esse! Sed, nesciunt explicabo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab delectus ex, fugit aperiam
            voluptate rerum saepe dicta impedit quisquam corporis repellendus cupiditate, id amet nobis, rem laborum facilis tempora commodi?
            Sapiente, nihil! Adipisci, illo ipsa. Dolorum illum, provident eaque earum totam qui ullam, eligendi esse impedit culpa maxime obcaecati.
            Ex voluptas dolorem, iste dolor voluptatem in unde tenetur laboriosam quibusdam inventore dignissimos maiores harum assumenda reiciendis
            alias laborum. Alias mollitia, nulla, blanditiis corporis ab voluptates veniam rem facere sit expedita tenetur beatae possimus, omnis
            quidem adipisci? Unde reprehenderit optio inventore, magni officiis incidunt eligendi corporis officia doloremque dignissimos quaerat
            minus!
          </p>

          {/* Audio Player */}
          <div className="flex items-center justify-between mt-6">
            <button className="bg-orange-500 text-white font-bold px-4 py-2 rounded shadow-md">Play</button>
            <div className="flex gap-2 items-center">
              <p className="text-gray-600">02:22</p>
              <input type="range" className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
              <p className="text-gray-600">Volume</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryResponse;
