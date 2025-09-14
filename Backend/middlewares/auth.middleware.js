const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel=require('../models/blacklistToken.model')
module.exports.authUser=async(req,res,next)=>{
    const token =req.cookies.token||req.headers.authorization?.split(' ')[1];
    console.log("yo")
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    const isblacklisted= await blacklistTokenModel.findOne({token:token});
    if(isblacklisted){
        return res.status(401).json({message:"Not Authorized"});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded.id)
        console.log(decoded.id)
        req.user=user;
        return next();

    }catch (err){
        return res.status(401).json({message:'Unauthorized'})
    }
}