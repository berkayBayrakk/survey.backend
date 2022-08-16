const dateFormatController=require('../../helper/dateFormatValidator');
const {createSurvey}=require('../../model/Surveys');
const hasValidDepartmentIds = require('../../helper/hasDepartmentIds');
const {createDepartmentSurvey} =require('../../model/Departments_Surveys');
const {createQueryString} =require('../../helper/departmentsSurveysHelper');
const createSruveyHandler=async(req,res)=>{
    const {name,end_date,start_date,description,department_ids}=req.body;
    if(!name || !end_date || !start_date || !description || !department_ids){
        return res.status(400).json({"message":"Missing information"});
    } 
    if(!(dateFormatController(end_date) && dateFormatController(start_date))){
        return res.status(400).json({"message":"Dates format is not valid. It should be yyyy-mm-dd"});
    }
    try {

        if(! await hasValidDepartmentIds(department_ids)) return res.status(400).json({"message":"Department ids are not valid"});
        
        const survey={name,start_date,end_date,description}
        const result=await createSurvey(survey);
        const survey_id=result.insertId;
        
        let createDepartmentsSurveysString=createQueryString(department_ids,survey_id);
        
        await createDepartmentSurvey(createDepartmentsSurveysString);

        res.status(201).json({"id":survey_id,"name":name});
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=createSruveyHandler;
