import React from "react";
import pinIcon from "../../assets/Images/button yellow.png";
import bgImage from "../../assets/Images/bg white.png";

const testimonials = Array(6).fill({
  text: "Shah Ghouse Biryani offers a tantalizing blend of aromatic spices and tender meat, delivering an authentic taste of Hyderabad in every flavorful bite.",
  name: "Kishan Singh",
});

const Reviews = () => {
  return (
    <section
      className="relative py-16 px-4 text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Section Heading */}
      <h2 className="relative z-10 text-3xl font-bold mb-10 text-gray-800">
        People Love Shah Ghouse
        <div className="h-1 w-70 bg-gray-500 mx-auto mt-1 rounded-full" />
      </h2>

      {/* Testimonials Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
       <div
       key={index}
       className="backdrop-blur shadow-sm rounded-md p-4 pt-6 mt-4 relative transform hover:scale-[1.02] transition duration-300 z-10"
       style={{
         overflow: "visible",
         minHeight: "170px",
       }}
     >
       {/* Pin Image */}
       <img
         src={pinIcon}
         alt="Pin"
         className="w-6 h-6 absolute -top-4 left-1/2 transform -translate-x-1/2 rotate-1 z-20 drop-shadow"
       />
     
       {/* Enhanced Review Content */}
       <p className="text-gray-800 text-sm font-medium leading-snug mb-2">
         {testimonial.text}
       </p>
       <div className="text-yellow-500 text-base font-semibold mb-1 leading-none">
         ★★★★★
       </div>
       <p className="text-sm font-semibold text-gray-600">
         By {testimonial.name}
       </p>
     </div>
     
        ))}
      </div>
    </section>
  );
};

export default Reviews;
