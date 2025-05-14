const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// public
router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token',authController.resetPassword);

module.exports = router;