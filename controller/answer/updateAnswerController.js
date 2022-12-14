
const updateAnswerHandler=async(req,res)=>{
    const {answer,question_id}=req.body;
    let id=0;
    const username=req.username;
    if(!answer || !question_id) return res.status(400).json({'message':'Missing informations.'});

    try {
        const user=await req.database.getUserByUsername(username);
        const questionObject=await req.database.getQuestionById(question_id);
        const answers=await req.database.getAnswers();

        if(user &&questionObject&& answers){
            let isExist=false;
            //control that user was send asnwer before
            answers.forEach(answer=>{
                if(answer.user_id===user.id && answer.question_id===question_id){
                    isExist=true;
                    id=answer.id;
                    };
            })
            if(!isExist) return res.status(400).json({'message':'You have not send answer for this question yet.'});
            const result =await req.database.updateAnswer(id,answer);
            if(result) res.json({'message':'Answer updated'});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports=updateAnswerHandler;