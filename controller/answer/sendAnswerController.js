
const sendAnswerHandler=async(req,res)=>{
    const {answer,question_id}=req.body;
    
    const username=req.username;
    const departmentId=req.department_id;
    if(!answer || !question_id) return res.status(400).json({'message':'Missing informations.'});
    let isValid=false;
    try {
        const user=await req.database.getUserByUsername(username);
        const questionObject=await req.database.getQuestionById(question_id);
        const departmentsSurveys=await req.database.getDepartmentsSurveys(departmentId);
        const answers=await req.database.getAnswers();

        if(user &&questionObject&& departmentsSurveys && answers){
            let isExist=false;
            //control that user was send asnwer before
            answers.forEach(answer=>{
                if(answer.user_id===user.id && answer.question_id===question_id) isExist=true;
            })
            if(isExist) return res.status(400).json({'message':'You have already send answer for this question.'});
            departmentsSurveys.forEach(element => {
                if(element.survey_id==questionObject[0].survey_id) isValid=true;
            });
            if(!isValid) return res.sendStatus(403);

            const answerObj={answer,question_id,'user_id':user.id};
            const result=await req.database.createAnswer(answerObj);
            if(result) res.status(201).json({'message':'Answer sended'});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports=sendAnswerHandler;