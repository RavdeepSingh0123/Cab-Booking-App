const express=require('express');
const {body} = require('express-validator');
const router=express.Router();
const captainController=require('../Controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be atleast 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Vehicle Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Vehicle Number must be atleast 3 characters long'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Vehicle Capacity must be atleast 1 pessanger'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid Vehicle type')
],captainController.registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],captainController.loginCaptain)

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)

router.post('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)


module.exports=router;
