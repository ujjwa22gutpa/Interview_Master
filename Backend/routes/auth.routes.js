const Router = require('express').Router();
const { signUpController, loginController, logOutController }  = require('../controllers/authController')
const {signUpValidation, loginValidation} = require('../middlewares/authMiddlware')

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


module.exports = Router;