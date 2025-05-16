
const mealService = require('../services/meal.service');
const meal=require('./../models/meal')

const getMeals = async (req, res) => {
  try {
    const meals = await mealService.getMeals(req.query);
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ____________________Admin staff


const addMultipleMeals = async (req, res) => {
  try {
    const meals = await meal.insertMany(req.body); // expects array of meals
    res.status(201).json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { getMeals,addMultipleMeals };
