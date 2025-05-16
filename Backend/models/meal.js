const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Juice",
        "Biryani",
        "Pizza",
        "Burger",
        "Salad",
        "Sweets",
        "Ice Cream",
        "Drinks",
        "Dessert",
        "Vegetarian",
        "Non-Vegetarian",
      ],
      default: "Lunch",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model("Meal", MealSchema);
