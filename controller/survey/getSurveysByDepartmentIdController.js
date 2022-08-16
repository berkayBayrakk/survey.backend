const {getSurveyByDepartmentId} =require('../../model/Surveys');

const getSurveysByDepartmentId=async(req,res)=>{
    const department_id=req.department_id;
    if(!department_id) return res.status(400).json({"message":"Survey not found"});
    try {
        const result=await getSurveyByDepartmentId(department_id);
        if(result) res.json(result);
    } catch (error) {
        res.status(500).json({"message":error});
    }
}

module.exports=getSurveysByDepartmentId;