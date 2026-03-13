const e = require("express");
const joi = require("joi");
const jwt  = require('jsonwebtoken');
const blackListModel = require('../model/blacklist.Model');

const signUpValidation = (req,res,next)=>{
    const Schema = joi.object({
        userName:joi.string().min(4).max(100).required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).max(100).required()
    })
    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(404).json({
            message:"Bad Request",
            success:false,
            error: error.message
        })
    }
    next()
}


const loginValidation = (req,res,next)=>{
    const Schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(4).max(100).required()
    })
    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(404).json({
            message:"Bad Request",
            success:false,
            error: error.message
        })
    }
    next()
}

async function tokenValidation (req, res, next) {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized Access",
            success:false,
            error:"Please login to access this resource"
        })
    }
    // Check if token is blacklisted
    const isBlacklisted = await blackListModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({
            message:"Unauthorized Access - Token has been invalidated",
            success:false,
            error:"Please login again"
        })
    }
     try {
      const decoded =   jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded;
      next()
     } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:"Unauthorized Access",
            success:false,
            error:error.message
        })
     }
}



module.exports = {
    signUpValidation,
    loginValidation,
    tokenValidation
}


