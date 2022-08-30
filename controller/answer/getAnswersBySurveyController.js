
const getAnswersBySurveyHandler=async(req,res)=>{
    const {surveyId}=req.body;
    const username=req.username;
    
    if(!surveyId) return res.status(400).json({'message':'Missing information.'});

    try {
        const user=await req.database.getUserByUsername(username);
        const questions=await req.database.getQuestionBySurvey(surveyId);
        if(user && questions){
            let questionsIdStr='(';
            questions.forEach(question => {
                questionsIdStr+=`${question.id},`;
            });
            questionsIdStr=questionsIdStr.slice(0, -1);
            questionsIdStr+=')';
            const result=await req.database.getAnswersBySurvey(questionsIdStr);
            if(result){
                res.json(result);
            }
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports=getAnswersBySurveyHandler;