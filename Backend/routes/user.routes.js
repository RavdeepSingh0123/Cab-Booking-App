const express=require('express');
const userModel=require('../models/user.model');
const router=express.Router();
const userController=require('../Controllers/user.controller')
const authMiddleware=require('../middlewares/auth.middleware')
const {body} = require ("express-validator");

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be atleast 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],userController.registerUser)


router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],userController.loginUser)

router.post('/profile',authMiddleware.authUser,userController.getUserProfile)
router.post('/logout',authMiddleware.authUser,userController.logoutUser)

module.exports=router;