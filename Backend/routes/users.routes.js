const userController=require('../controllers/users.controller')
const express=require('express')
const authenticateJWT=require('../middleware/authonticate')
const authorizeRole=require('../middleware/authorizeRole')
const router=express.Router();

router.get('/',authenticateJWT,authorizeRole(['admin']),userController.getAllUsers);
router.delete('/',authenticateJWT,authorizeRole(['admin']),userController.deleteAllUsers);
router.get('/:email',authenticateJWT,authorizeRole(['admin']),userController.getUsersByEmail);
router.put('/:email',authenticateJWT,authorizeRole(['admin']),userController.updateUserByEmail);

module.exports = router;