import React from "react";
import Hero from "../../assets/videos/hero-video.mp4";

const HeroVideo = () => {
  return (
    <div className="w-full h-[30rem] overflow-hidden rounded-lg relative">
      <video
        autoPlay
        muted
        loop
        className="w-full h-full object-cover filter brightness-75 contrast-125 saturate-150 opacity-50"
      >
        <source src={Hero} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Overlay Content */}
      {/* <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <h1 className="text-white text-3xl font-bold">Welcome to Our Restaurant</h1>
      </div> */}
    </div>
  );
};

export default HeroVideo;
