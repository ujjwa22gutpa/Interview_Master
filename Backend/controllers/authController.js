const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser")
const blackListModel = require('../model/blacklist.Model')

/**
 *
 * @name  signUpController
 * @description register a new user, expects userName, email and password in the request body
 * @route POST /api/auth/signup
 * @access Public
 *
 */
async function signUpController(req, res) {
  try {
    const { userName, email, password } = req.body;
    const isUserExists = await userModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (isUserExists) {
      return res.status(403).json({
        message: `user with the same ${isUserExists.userName === userName ? "userName" : "email"} already exists, please try different one`,
        success: false,
      });
    }
    const UserModel = new userModel({ userName, email, password });
    UserModel.password = await bcrypt.hash(password, 10);
    const jwtToken = await jwt.sign(
      { userId: UserModel._id, email: UserModel.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie('token',jwtToken);
    await UserModel.save();
    res.status(200).json({
      message: "user registered successfully",
      success: true,
      email: UserModel.email,
      userName: UserModel.userName,
      _id:UserModel._id,
      jwtToken,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
}

// this is js doc comment
/**
 *
 * @name  loginController
 * @description login user, expects  email and password in the request body
 * @route POST /api/auth/login
 * @access Public
 *
 */


async function loginController(req, res) {
  try {
    const {email, password } = req.body;
    const isUserExists = await userModel.findOne( { email });

    if (!isUserExists) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
    }
  const isPassValid = await bcrypt.compare(password, isUserExists.password);
  if(!isPassValid){
     return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
  }

    const jwtToken = await jwt.sign(
      { userId: isUserExists._id, email: isUserExists.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie('token',jwtToken);
    res.status(200).json({
      message: "User LoggedIn successfully",
      success: true,
      email: isUserExists.email,
      userName: isUserExists.userName,
      _id:isUserExists._id,
      jwtToken,
    });
  } catch (error) {
  
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
}


async function logOutController (req, res) {
  try {
     const token  = req.cookies.token;
    if(token){
        await blackListModel.create({token});
    }
    res.clearCookie("token");
    res.status(200).json({
      message:"User logged out successfully",
      success:true
    })
  } catch (error) {
    console.log("----->>>>",error)
    res.status(500).json({
        message:"Internal server Problem",
        success:false,
        error:error.message
    })
  }
}
module.exports = {
  signUpController, loginController,
  logOutController
};
