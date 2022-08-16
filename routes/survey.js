const express=require('express');
const surveyRoute=express.Router();
const verifyRoles=require('../middleware/verifyRoles');
const roleList=require('../config/Role_List');
const createSruveyHandler=require('../controller/survey/createSurveyController');
const updateSurveyById=require('../controller/survey/updateSurveyController');
const getSurveysByDepartmentId=require('../controller/survey/getSurveysByDepartmentIdController');
const createQuestionHandler=require('../controller/question/createQuestionController');
const getQuestionBySurveyId=require('../controller/question/getQuestionBySurveyIdController');
surveyRoute.route('/')
    .post(verifyRoles(roleList.admin,roleList.manager),createSruveyHandler)
    .get(getSurveysByDepartmentId);


surveyRoute.route('/question')
    .post(verifyRoles(roleList.admin,roleList.manager),createQuestionHandler);

surveyRoute.route('/:id')
    .put(verifyRoles(roleList.admin,roleList.manager),updateSurveyById)
    .get(getQuestionBySurveyId);

module.exports=surveyRoute;