
const getQuestionBySurveyId=async(req,res)=>{
    const surveyId=req.params.id;
    const departmentId=req.department_id;
    //control department id is valid for choosen survey.    
    try {
        let isValid=false
        const departmentsSurveys=await req.database.getDepartmentsSurveys(departmentId);
        departmentsSurveys.forEach(element => {
            if(element.survey_id==surveyId) isValid=true;            
        });
        
        if(!isValid) return res.sendStatus(403);

        const questions=await req.database.getQuestionBySurvey(surveyId);
        
        if(questions){
            const questionIdArray=[];
            questions.forEach(question=>{
                questionIdArray.push(question.id);
            })
            const questionsWithChoices=questions.map(obj=>({...obj,choices:[]}))

            const choices=await req.database.getChoicesByQuestionId(questionIdArray);
            
            choices.forEach(choice=>{
                    
                questionsWithChoices.forEach(question=>{ 
                    if(question.id==choice.question_id) question.choices.push(choice);
                    })
                })
            return res.json(questionsWithChoices);
        }
    
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports=getQuestionBySurveyId;