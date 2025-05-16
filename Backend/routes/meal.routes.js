const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meals.controller');

router.get('/', mealController.getMeals);

// router.get('/:name', mealController.getMealsByName);

// router.get('/category/:category', mealController.getMealsByCategory);

router.post('/',mealController.addMultipleMeals)
module.exports = router;