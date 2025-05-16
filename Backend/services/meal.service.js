const Meal = require('../models/meal');


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
  getMeals,
};
