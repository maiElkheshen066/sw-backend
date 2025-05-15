import React from 'react';
import Button from "./Button";
import chickenImg from "../../assets/Images/dish 1.png";
import muttonImg from "../../assets/Images/dish 2.png";
import biryaniImg from "../../assets/Images/dish 3.png";
import bg from "../../assets/Images/bg.png";

const MenuHighlight = () => (
  <section
    className="text-white py-16 px-8"
    style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="max-w-6xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Top Items From Our Menu
      </h2>
      <div className="flex flex-col md:flex-row  gap-14 mb-10">
        {[
          { name: 'Chicken Curry', img: chickenImg },
          { name: 'Mutton Biryani', img: muttonImg },
          { name: 'Chicken Biryani', img: biryaniImg },
        ].map((item, idx) => (
          <div key={idx} className="text-center group">
            <img
              src={item.img}
              alt={item.name}
              className="w-64 h-64 object-cover rounded-full mx-auto mb-2 transform transition-transform duration-300 hover:scale-170 hover:shadow-xl"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
          </div>
        ))}
      </div>
      <div className="center">
        <Button text="Check Out Full Menu"
        onClick={() => window.location.href = "/menu"} />
      </div>
    </div>
  </section>
);

export default MenuHighlight;
