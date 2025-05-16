const Meal = require('../models/meal');

// Create a new meal
const addMeal = async (mealData) => {
  const { name, description, price, imageUrl, category } = mealData;

  const existingMeal = await Meal.findOne({ name });
  if (existingMeal) {
    throw new Error('Meal already exists');
  }

  const newMeal = new Meal({ name, description, price, imageUrl, category });
  await newMeal.save();

  return formatMeal(newMeal);
};

// Update a meal by name
const updateMeal = async (mealData, nameParam) => {
  const existingMeal = await Meal.findOne({ name: nameParam });
  if (!existingMeal) {
    throw new Error('Meal not found');
  }

  const { description, price, imageUrl, category } = mealData;

  existingMeal.description = description ?? existingMeal.description;
  existingMeal.price = price ?? existingMeal.price;
  existingMeal.imageUrl = imageUrl ?? existingMeal.imageUrl;
  existingMeal.category = category ?? existingMeal.category;

  await existingMeal.save();
  return formatMeal(existingMeal);
};

// Delete a meal by name
const deleteMeal = async (name) => {
  const existingMeal = await Meal.findOne({ name });
  if (!existingMeal) {
    throw new Error('Meal not found');
  }

  await existingMeal.deleteOne(); // or existingMeal.remove()
  return formatMeal(existingMeal);
};

// Get all meals with optional filters
const getMeals = async (query) => {
  const { search, category, priceRange } = query;

  let filter = {};

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  if (category) {
    filter.category = category;
  }

  if (priceRange) {
    if (priceRange === 'low') filter.price = { $lt: 10 };
    else if (priceRange === 'medium') filter.price = { $gte: 10, $lte: 20 };
    else if (priceRange === 'high') filter.price = { $gt: 20 };
  }

  const meals = await Meal.find(filter);
  return meals.map(formatMeal);
};

// Get a meal by name
const getMealsByName = async (name) => {
  const existingMeal = await Meal.findOne({ name });
  if (!existingMeal) {
    throw new Error('Meal not found');
  }

  return formatMeal(existingMeal);
};

// Get meals by category
const getMealsByCategory = async (category) => {
  const meals = await Meal.find({ category });
  return meals.map(formatMeal);
};

// Helper function to format response
const formatMeal = (meal) => ({
  id: meal._id,
  name: meal.name,
  description: meal.description,
  price: meal.price,
  category: meal.category,
  image: meal.image,
});

module.exports = {
  addMeal,
  updateMeal,
  deleteMeal,
  getMeals,
  getMealsByName,
  getMealsByCategory,
};
