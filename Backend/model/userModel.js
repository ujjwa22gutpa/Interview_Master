const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        unique:[true, "User name already existed"],
        required:true
    },

    email:{
        type:String,
        unique:[true, "Email already existed please try different one"],
        required:true
    },

    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const userModel = mongoose.model('users',userSchema);
module.exports = userModel;