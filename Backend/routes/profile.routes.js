const express = require('express');
const router = express.Router();
const profileController=require('./../controllers/profile.controller')
const authenticateJWT=require('./../middleware/authonticate')

router.get('/',authenticateJWT,profileController.getProfile)
router.put('/',authenticateJWT,profileController.updateProfile)

module.exports = router;