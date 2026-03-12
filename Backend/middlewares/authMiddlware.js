const joi = require("joi");

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

module.exports = {
    signUpValidation,
    loginValidation
}


