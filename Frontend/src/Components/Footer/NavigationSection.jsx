import React from "react";

const NavigationSection = () => {
  return (
    <div className="flex gap-20 max-md:flex-col max-md:gap-8">
      <nav className="flex flex-col gap-2">
        <h2 className="mb-2 text-xl font-bold leading-8 text-white">Explore</h2>
        <div className="flex flex-col gap-2.5">
          <a
            href="#"
            className="gap-5 text-sm leading-5 no-underline text-zinc-300 hover:text-white transition-colors"
          >
            About Us
          </a>
          <a
            href="#"
            className="gap-5 text-sm leading-5 no-underline text-zinc-300 hover:text-white transition-colors"
          >
            Menu
          </a>
          <a
            href="#"
            className="gap-5 text-sm leading-5 no-underline text-zinc-300 hover:text-white transition-colors"
          >
            Order Online
          </a>
          <a
            href="#"
            className="gap-5 text-sm leading-5 no-underline text-zinc-300 hover:text-white transition-colors"
          >
            Blog
          </a>
          <a
            href="#"
            className="gap-5 text-sm leading-5 no-underline text-zinc-300 hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>
      </nav>
      <nav className="flex flex-col gap-2">
        <h2 className="mb-2 text-xl font-bold leading-8 text-white">
          Contact Us
        </h2>
        <div className="flex flex-col gap-2.5">
          <a
            href="#"
            className="flex gap-5 items-center text-sm leading-5 no-underline text-zinc-300 hover:text-white transition-colors"
          >
            <i className="ti ti-mail text-lg" aria-hidden="true" />
            <span>Mail Us</span>
          </a>
          <a
            href="#"
            className="flex gap-5 items-center text-sm leading-5 no-underline text-zinc-300 hover:text-white transition-colors"
          >
            <i className="ti ti-phone text-lg" aria-hidden="true" />
            <span>Call Us</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavigationSection;
