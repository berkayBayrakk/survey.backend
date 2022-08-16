const express=require('express');
const authRoute=express.Router();
const {getRoles}=require('../controller/roles/getRolesController');

authRoute.route('/').get(getRoles);

module.exports=authRoute;