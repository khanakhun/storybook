// import React, { useState, useRef } from "react";
// import { FcSpeaker } from "react-icons/fc";
// import { generateSpeech } from "../services/api";
// import { FaCirclePause } from "react-icons/fa6";
// import { FaPlayCircle } from "react-icons/fa";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import { FaStopCircle } from "react-icons/fa";
// import { useAppStore } from "@/lib/store";

// interface StoryDisplayProps {
//   story: string;
// }

// const StoryDisplay: React.FC<StoryDisplayProps> = ({ story }) => {
//   const { language } = useAppStore();

//   const formatStory = (story: string) => {
//     const paragraphs = story.split("\n").filter((para) => para.trim() !== "");
//     return paragraphs.map((para, index) => (
//       <p key={index} className="text-lg text-white mb-4">
//         {para}
//       </p>
//     ));
//   };

//   return (
//     <div className="p-6 text-white rounded-lg shadow-lg  mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-semibold text-white">{language === "en" ? " Your Story" : "הסיפור שלך"}</h2>
//         {isLoading && (
//           <div className="flex flex-col items-center">
//             <DotLottieReact className="w-auto h-32" src={"/voice.lottie"} loop autoplay />
//             <p className="animate-bounce">Hang tight, we&apos;re making your words magical! 🎤✨</p>
//           </div>
//         )}

//         {!isLoading && (
//           <div className="space-x-3">
//             <button
//               onClick={handleSpeakerClick}
//               className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-all duration-200"
//               title="Generate Speech"
//             >
//               <FcSpeaker size={24} />
//             </button>
//             {audioUrl && (
//               <>
//                 <button
//                   onClick={handlePlayPause}
//                   className={`p-3 bg-green-500 rounded-full text-white hover:bg-green-600 transition-all duration-200 ${
//                     isPlaying ? "bg-red-500" : ""
//                   }`}
//                   title={isPlaying ? "Pause" : "Play"}
//                 >
//                   {isPlaying ? <FaCirclePause size={24} /> : <FaPlayCircle size={24} />}
//                 </button>
//                 <button
//                   onClick={handleStop}
//                   className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 transition-all duration-200"
//                   title="Stop"
//                 >
//                   <FaStopCircle size={24} />
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="text-white mb-6">{formatStory(story)}</div>

//     </div>
//   );
// };

// export default StoryDisplay;
