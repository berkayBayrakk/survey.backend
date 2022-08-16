const {getSurveyById,updateSurvey}=require('../../model/Surveys');
const {deleteDepartmentsSurveysBySurveyId} =require('../../model/Departments_Surveys');
const {createQueryString} =require('../../helper/departmentsSurveysHelper');
const {createDepartmentSurvey} =require('../../model/Departments_Surveys');

const updateSurveyById=async(req,res)=>{
    const id=req.params.id;
    const {name,end_date,start_date,description,department_ids}=req.body;
    try {
        const result=await getSurveyById(id);
        if(!result?.id) return res.status(401).json({"message":"Survey does not exist"});
        if(!name || !end_date || !start_date || !description || !department_ids){
            return res.status(400).json({"message":"Missing information"});
        } 
        if(!(dateFormatController(end_date) && dateFormatController(start_date))){
            return res.status(400).json({"message":"Dates format is not valid. It should be yyyy-mm-dd"});
        }

        if(! await hasValidDepartmentIds(department_ids)) return res.status(400).json({"message":"Department ids are not valid"});
        
        const survey={name,start_date,end_date,description,id};

        const ok=await updateSurvey(survey);
        if(ok){
            const result=await deleteDepartmentsSurveysBySurveyId(survey.id);
            if(result){
                let stringQuery=createQueryString(department_ids,survey.id);
                const result=await createDepartmentSurvey(stringQuery);
                if(result) res.status(201).json({"id":survey.id,"name":name});
            }
        } 
    } catch (error) {
        res.status(500).json({"message":error});
    }
}
module.exports=updateSurveyById;