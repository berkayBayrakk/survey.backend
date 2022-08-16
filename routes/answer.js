const express=require('express');
const answerRoute=express.Router();
const sendAnswerHandler=require('../controller/answer/sendAnswerController');
const updateAnswerHandler=require('../controller/answer/updateAnswerController');
const getAnswersBySurveyHandler=require('../controller/answer/getAnswersBySurveyController');
answerRoute.route('/')
    .post(sendAnswerHandler)
    .put(updateAnswerHandler);

answerRoute.route('/usersanswers')
    .get(getAnswersBySurveyHandler);
module.exports=answerRoute;