// src/Pages/Menu.jsx
import React, { useState } from "react";
import ReactSlider from "react-slider";
import FoodCard from "../Components/menu/foodItem";
import bgImg from "../assets/Images/bg.png";
import SearchBar from "../Components/menu/SearchBar";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const { cartItems, addToCart } = useCart(); // Use CartContext

  const foodItems = [
    {
      id: 1,
      name: "Chicken Biryani",
      category: "non-veg",
      tags: ["spicy", "popular"],
      image:
        "https://res.cloudinary.com/dvghbsyda/image/upload/v1744538049/photo_12_2025-04-12_17-39-38_yyu5sk.jpg",
      description: "Aromatic rice dish with tender chicken and spices.",
      price: 12.99,
      offer: 50,
    },
    {
      id: 2,
      name: "Paneer Tikka",
      category: "vegetarian",
      tags: ["vegetarian", "gluten-free"],
      image:
        "https://res.cloudinary.com/dvghbsyda/image/upload/v1744538049/photo_12_2025-04-12_17-39-38_yyu5sk.jpg",
      description: "Spicy grilled paneer with veggies and chutney.",
      price: 9.99,
      offer: 30,
    },
    {
      id: 3,
      name: "Gulab Jamun",
      category: "dessert",
      tags: ["sweet", "popular"],
      image:
        "https://res.cloudinary.com/dvghbsyda/image/upload/v1744538049/photo_12_2025-04-12_17-39-38_yyu5sk.jpg",
      description: "Sweet, soft dessert soaked in rose-flavored syrup.",
      price: 5.5,
      offer: 10,
    },
    {
      id: 4,
      name: "Grilled Fish",
      category: "non-veg",
      tags: ["grilled", "low-calorie"],
      image:
        "https://res.cloudinary.com/dvghbsyda/image/upload/v1744538049/photo_12_2025-04-12_17-39-38_yyu5sk.jpg",
      description: "Grilled fish fillet with herbs and lemon.",
      price: 18.0,
      offer: 20,
    },
  ];

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => item.tags.includes(tag));
    const matchesPrice =
      parseFloat(item.price) >= priceRange[0] &&
      parseFloat(item.price) <= priceRange[1];

    return matchesSearch && matchesCategory && matchesTags && matchesPrice;
  });

  const toggleSelection = (list, setList, value) => {
    setList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div
      className="menu-container pt-[6rem] px-4"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#D0A429FF]-100">
          Explore Our Menu <span>🍽</span>
        </h1>
        <p className="text-lg text-white-900 mt-2">
          Discover delicious meals and customize your preferences.
        </p>
        <Link
          to="/Cart"
          className="mt-4 inline-block bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          View Cart ({cartItems.length})
        </Link>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md bg-[linear-gradient(90deg,_rgb(22,66,60),_rgb(45,100,94),_rgb(38,84,78),_rgb(51,108,101))]">
          <h2 className="text-xl font-bold text-white-800 mb-6">🧮 Filters</h2>

          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Category</h3>
            <div className="space-y-2">
              {["vegetarian", "non-veg", "dessert"].map((category) => (
                <div
                  key={category}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedCategories.includes(category)
                      ? "bg-green-100 text-green-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    toggleSelection(
                      selectedCategories,
                      setSelectedCategories,
                      category
                    )
                  }
                >
                  <span className="capitalize">{category}</span>
                  {selectedCategories.includes(category) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Tags</h3>
            <div className="space-y-2">
              {[
                "spicy",
                "gluten-free",
                "popular",
                "grilled",
                "low-calorie",
              ].map((tag) => (
                <div
                  key={tag}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? "bg-blue-100 text-blue-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    toggleSelection(selectedTags, setSelectedTags, tag)
                  }
                >
                  <span className="capitalize">{tag}</span>
                  {selectedTags.includes(tag) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-gray-800 text-xl font-semibold mb-4">
              Price Range
            </h3>
            <ReactSlider
              className="w-full h-2 bg-neutral-200 rounded-md"
              thumbClassName="w-5 h-5 bg-white border-2 border-primary shadow-lg rounded-full cursor-pointer hover:scale-110 transition-all duration-200"
              trackClassName="bg-primary h-2 rounded-md"
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              min={0}
              max={100}
              pearling
              minDistance={1}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-3 font-medium">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
          </div>
        </div>

        {/* Food Items */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No food items match your filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;