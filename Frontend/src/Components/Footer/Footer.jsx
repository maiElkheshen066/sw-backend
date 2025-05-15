"use client";
import React from "react";
import SocialSection from "./SocialSection";
import NavigationSection from "./NavigationSection";
import MapSection from "./MapSection";

const Footer = () => {
  return (
<footer
  className="px-24 py-20 text-white max-sm:px-5 max-sm:py-10 bg-cover bg-center bg-no-repeat "
  style={{ backgroundImage: "url('/src/assets/bg.jpg')" }}
>

      <div className="flex gap-20 justify-between items-start mx-auto my-0 max-w-[1240px] max-md:flex-col max-md:gap-10 max-sm:gap-8 flex-wrap">
        <SocialSection />
        <NavigationSection />
        <MapSection />
      </div>
    </footer>
  );
};

export default Footer;
