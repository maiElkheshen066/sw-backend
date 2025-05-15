// src/Components/menu/foodItem.jsx
import React from "react";
import { FaCartPlus } from "react-icons/fa";
import Button from "../Main/Button";

function FoodCard({ item, onAddToCart }) {
  return (
    <div className="relative max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden m-4 border hover:shadow-xl transition-shadow duration-300">
      {/* Offer Tag */}
      {item.offer && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
          {`${item.offer}% OFF`}
        </span>
      )}

      {/* Food Image */}
      <img
        src={item.image}
        alt={item.name}
        width={200}
        className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1 text-black">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{item.description}</p>

        {/* Price tag */}
        <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
          ${item.price.toFixed(2)}
        </span>

        <Button
          text="Add to Cart"
          secondary={false}
          icon={<FaCartPlus />}
          onClick={() => onAddToCart(item)}
        />
      </div>
    </div>
  );
}

export default FoodCard;