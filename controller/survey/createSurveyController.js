const dateFormatController=require('../../helper/dateFormatValidator');
const hasValidDepartmentIds = require('../../helper/hasDepartmentIds');
const {createQueryString} =require('../../helper/departmentsSurveysHelper');
const createSruveyHandler=async(req,res)=>{
    const {name,end_date,start_date,description,department_ids}=req.body;
    if(!name || !end_date || !start_date || !description || !department_ids)return res.status(400).json({"message":"Missing information"});
    
    if(!(dateFormatController(end_date) && dateFormatController(start_date)))return res.status(400).json({"message":"Dates format is not valid. It should be yyyy-mm-dd"});
    
    try {
        const dep_ids_db=await req.database.getDepartmentsList();
        if(!hasValidDepartmentIds(department_ids,dep_ids_db)) return res.status(400).json({"message":"Department ids are not valid"});
        
        const survey={name,start_date,end_date,description}
        const result=await req.database.createSurvey(survey);
        const survey_id=result.insertId;
        
        let createDepartmentsSurveysString=createQueryString(department_ids,survey_id);
        await req.database.createDepartmentSurvey(createDepartmentsSurveysString);

        res.status(201).json({"id":survey_id,"name":name});
        return;
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=createSruveyHandler;
