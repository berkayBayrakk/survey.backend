const {createQuestion}=require('../../model/Questions');
const {createChoicesByQuestionId}=require('../../model/Choices');

const createQuestionHandler=async(req,res)=>{
    const {title,surveyId,inputTypeId,choices}=req.body;
    if(!title || !surveyId || !inputTypeId || !choices) return res.status(400).json({"message":"Missing information"});
    const question={"title":title,"survey_id":surveyId,"input_type_id":inputTypeId};

    try {
        const result=await createQuestion(question);
        const questionId=result.insertId;
        if(result){
            const result=await createChoicesByQuestionId(questionId,choices);
            if(result) return res.status(201).json({'Message':'Question added'});
        } 

    } catch (error) {
        return res.status(500).json({"message":error});
    }
};

module.exports=createQuestionHandler;