const {getUserByUsername} =require('../../model/Users');
const {getQuestionBySurvey} =require('../../model/Questions');
const {getAnswersBySurvey} =require('../../model/Answers');
const getAnswersBySurveyHandler=async(req,res)=>{
    const {surveyId}=req.body;
    const username=req.username;
    if(!surveyId) return res.status(400).json({'message':'Missing information.'});

    try {
        const user=await getUserByUsername(username);
        const questions=await getQuestionBySurvey(surveyId);
        if(user && questions){
            let questionsIdStr='(';
            questions.forEach(question => {
                questionsIdStr+=`${question.id},`;
            });
            questionsIdStr=questionsIdStr.slice(0, -1);
            questionsIdStr+=')';
            const result=await getAnswersBySurvey(questionsIdStr);
            if(result){
                res.json(result);
            }
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports=getAnswersBySurveyHandler;