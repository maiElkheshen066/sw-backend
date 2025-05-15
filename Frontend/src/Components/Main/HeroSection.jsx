import React from "react";
import Button from "./Button";
import bgImg from "../../assets/Images/bg.png";
import chickenImg from "../../assets/Images/hero img.png";

const HeroSection = () => (
  <section
    className="text-white w-full h-auto md:h-screen"
    style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 h-full flex items-center">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-12">

     {/* Left Text Content */}
     <div className="w-full md:w-1/2 space-y-6 text-center md:text-left flex flex-col md:items-start items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight flex flex-wrap justify-center md:justify-start gap-3">
            <span className="bg-gradient-to-r from-green-900 to-yellow-400 bg-clip-text text-transparent">
              Chicken Curry
            </span>
            <span role="img" aria-label="fire" className="animate-pulse">🔥</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-100 max-w-md mx-auto md:mx-0">
            Chicken biryani is a fragrant dish of seasoned rice layered with
            succulent chicken, infused with aromatic spices like cardamom,
            cloves, and saffron — a true explosion of flavor.
          </p>

          <div>
            <Button text="Order Now"
            onClick={() => window.location.href = "/menu"} />
          </div>
        </div>


        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center overflow-hidden">
          <img
            src={chickenImg}
            alt="Chicken Curry"
            className="w-4/5 sm:w-3/4 md:w-full max-h-[400px] md:max-h-full object-contain rounded-lg shadow-lg"
            style={{ animation: "spin 40s linear infinite" }}
          />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
