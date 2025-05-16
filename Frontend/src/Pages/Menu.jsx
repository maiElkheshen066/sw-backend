import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import FoodCard from "../Components/menu/foodItem";
import bgImg from "../assets/Images/bg.png";
import SearchBar from "../Components/menu/SearchBar";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems, addToCart } = useCart();

  // Fetch food items from API
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/meals");
        setFoodItems(response.data);
      } catch (err) {
        setError("Failed to fetch meals.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  // Filter logic
  const filteredItems = foodItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);
    const matchesPrice =
      parseFloat(item.price) >= priceRange[0] &&
      parseFloat(item.price) <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
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
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-yellow-400">
          Explore Our Menu <span role="img" aria-label="plate">🍽</span>
        </h1>
        <p className="text-lg text-white mt-2">
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
        {/* Filters */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md bg-[linear-gradient(90deg,_rgb(22,66,60),_rgb(45,100,94),_rgb(38,84,78),_rgb(51,108,101))]">
          <h2 className="text-xl font-bold text-white mb-6">🧮 Filters</h2>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3 text-white">Category</h3>
            <div className="space-y-2">
              {[
                "Vegetarian",
                "Non-Vegetarian",
                "Dessert",
                "Biryani",
                "Snack"
              ].map((category) => (
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
                </div>
              ))}
            </div>
          </div>

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

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {loading ? (
            <p className="text-center text-white">Loading menu...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <FoodCard key={item.id || item._id} item={item} onAddToCart={addToCart} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No food items match your filters.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;