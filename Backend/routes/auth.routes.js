const Router = require('express').Router();
const { signUpController, loginController, logOutController, tokenController }  = require('../controllers/authController')
const {signUpValidation, loginValidation, tokenValidation} = require('../middlewares/authMiddlware')

/**
 * @route POST /api/auth/signup
 * @description Register a new user
 * @access Public
 */


Router.post('/signup', signUpValidation, signUpController);

/**
 * @route POST /api/auth/login
 * @description Register a new user
 * @access Public
 */

Router.post('/login', loginValidation, loginController)


/**
 * @route POST /api/auth/logout
 * @description Logging Out a user and adding to blacklist 
 * @access Public
 */

Router.get('/logout', logOutController )

/**
 * @route get /api/auth/get-me
 * @description get user details of logged in user
 * @access Public
 */

Router.get('/get-me', tokenValidation, tokenController)

module.exports = Router;