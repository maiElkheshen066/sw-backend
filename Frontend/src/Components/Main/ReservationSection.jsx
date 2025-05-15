import React from "react";
import Button from "./Button";
import bg from "../../assets/Images/bg.png";
import HeroFood from "../../assets/Images/hero food.png";

const ReservationSection = () => (
  <section
    className="relative text-white py-16 px-8"
    style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="flex row container mx-auto px-4 sm:px-6 lg:px-8 h-full ">
     
      <div className="absolute top-0 right-0  "
      style={{width: '60%'}}>
        <img
          src={HeroFood}
          alt="Spices and ingredients"
          className="w-full h-auto"
        />
      </div>

      <div className="max-w-4xl z-10 backdrop-blur-sm z-50 md:backdrop-blur-none md:z-0 bg-white/10 rounded-xl p-6 shadow-lg"
      style={{width: '100%'}}> 
        <h1 className="text-4xl font-semibold mb-4">Shah Ghouse Biryani</h1>
        <h2 className="text-2xl">
          Where every dish tells a story of spice and tradition.
        </h2>
        <p className="mb-6">
          Chicken biryani is a fragrant dish of seasoned rice layered with
          succulent chicken pieces, <br />
          infused with aromatic spices like cardamom,
          cloves, and saffron, <br/>creating a symphony of flavors that tantalize the 
          palate with every bite.
        </p>
        <div className="space-x-6 flex row">
          <Button text="Book Your Reservation" />
          <Button text="Place Order Online" secondary />
        </div>
      </div>
      
    </div>
    {/* Image positioned top-right */}
  </section>
);

export default ReservationSection;
