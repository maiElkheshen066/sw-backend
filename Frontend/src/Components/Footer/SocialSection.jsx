import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

const SocialSection = () => {
  return (
    <section className="flex flex-col gap-9 items-start">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3eb7cac55e3a6db8ddea5abb298f9708eefb88ea"
        className="h-[81px] w-[179px] max-sm:h-auto max-sm:w-[140px]"
        alt="Shah Ghouse Biryani"
      />
      <div className="flex flex-col gap-2.5">
        <h2 className="text-xl font-bold leading-8 text-white">
          Let's get social
        </h2>
        <nav className="flex gap-3 max-sm:flex-wrap">
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-[#006EFFFF] hover:bg-[#145ecf] transition-colors duration-200 rounded-full text-white"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] hover:bg-[#0d8ddb] transition-colors duration-200 rounded-full text-white"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#962fbf] hover:opacity-90 transition-opacity duration-200 rounded-full text-white"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-[#FF0000] hover:bg-[#cc0000] transition-colors duration-200 rounded-full text-white"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-[#0A66C2] hover:bg-[#004182] transition-colors duration-200 rounded-full text-white"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-[#010101] hover:bg-[#1c1c1c] transition-colors duration-200 rounded-full text-white"
            aria-label="TikTok"
          >
            <FaTiktok />
          </a>
        </nav>
      </div>
    </section>
  );
};

export default SocialSection;
