const express=require('express');
const authRoute=express.Router();
const registerHandler=require('../controller/auth/registerController');
const loginHandler=require('../controller/auth/loginController');
const loginTestHandler=require('../controller/auth/loginTestController');
const logoutHandler=require('../controller/auth/logoutController');
const refreshHandler=require('../controller/auth/refreshTokenController');
const verifyJWT=require('../middleware/verifyJWT');

authRoute.route('/register').post(registerHandler);
authRoute.route('/login').post(loginHandler);
authRoute.route('/refresh').get(refreshHandler);
authRoute.route('/logout').get(verifyJWT,logoutHandler);
authRoute.route('/login/test').post(loginTestHandler);
module.exports=authRoute;