const {createAnswer,getAnswers,updateAnswer,getAnswersBySurvey}=require('./model/Answers');
const {createChoicesByQuestionId,getChoicesByQuestionId}=require('./model/Choices');
const {createDepartmentSurvey,deleteDepartmentsSurveysBySurveyId,getDepartmentsSurveys}=require('./model/Departments_Surveys');
const {getDepartmentsList}=require('./model/Departments');
const {getInputTypes}=require('./model/Input_Types');
const {createQuestion,getQuestionById,getQuestionBySurvey} =require('./model/Questions');
const {getRolesList}=require('./model/Roles');
const {createSurvey,getSurveyByDepartmentId,getSurveyById,updateSurvey}=require('./model/Surveys');
const {createUser,deleteUserById,getUserByUsername,getUsersList,updateUser}=require('./model/Users')


const database={
    createAnswer,getAnswers,updateAnswer,getAnswersBySurvey,
    createChoicesByQuestionId,getChoicesByQuestionId,
    createDepartmentSurvey,deleteDepartmentsSurveysBySurveyId,getDepartmentsSurveys,
    getDepartmentsList,
    getInputTypes,
    createQuestion,getQuestionById,getQuestionBySurvey,
    getRolesList,
    createSurvey,getSurveyByDepartmentId,getSurveyById,updateSurvey,
    createUser,deleteUserById,getUserByUsername,getUsersList,updateUser
}
module.exports=database;