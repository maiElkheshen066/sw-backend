
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

const getMealsByName = async (req, res) => {
  try {
    const meal = await mealService.getMealsByName(req.params.name);
    res.status(200).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMealsByCategory = async (req, res) => {
  try {
    const meals = await mealService.getMealsByCategory(req.params.category);
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// ____________________Admin staff

const addMeal = async (req, res) => {
  try {
    const mealData = req.body;
    const meal = await mealService.addMeal(mealData);
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMeal = async (req, res) => {
  try {
    const mealData = req.body;
    const meal = await mealService.updateMeal(mealData, req.params.name);  // Pass name via params
    res.status(200).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const meal = await mealService.deleteMeal(req.params.name);  // Pass name via params
    res.status(200).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addMultipleMeals = async (req, res) => {
  try {
    const meals = await meal.insertMany(req.body); // expects array of meals
    res.status(201).json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { getMeals,addMultipleMeals, getMealsByName, getMealsByCategory,addMeal, updateMeal, deleteMeal };
