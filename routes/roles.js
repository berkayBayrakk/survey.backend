const express=require('express');
const {getRoles}=require('../controller/roles/getRolesController');

const roleRoute=express.Router();
roleRoute.route('/').get(getRoles);


module.exports=roleRoute;