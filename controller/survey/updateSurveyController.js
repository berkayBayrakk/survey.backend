const {createQueryString} =require('../../helper/departmentsSurveysHelper');
const dateFormatController=require('../../helper/dateFormatValidator')
const hasValidDepartmentIds=require('../../helper/hasDepartmentIds')
const updateSurveyById=async(req,res)=>{
    const id=req.params.id;
    const {name,end_date,start_date,description,department_ids}=req.body;
    try {
        const result=await req.database.getSurveyById(id);

        if(!result?.id) return res.status(401).json({"message":"Survey does not exist"});

        if(!name || !end_date || !start_date || !description || !department_ids) return res.status(400).json({"message":"Missing information"});
        
        if(!(dateFormatController(end_date) && dateFormatController(start_date))) return res.status(400).json({"message":"Dates format is not valid. It should be yyyy-mm-dd"});
        
        const dep_ids_db=await req.database.getDepartmentsList();

        if(!hasValidDepartmentIds(department_ids,dep_ids_db)) return res.status(400).json({"message":"Department ids are not valid"});
        
        const survey={name,start_date,end_date,description,id};

        const ok=await req.database.updateSurvey(survey);
        if(ok){
            const result=await req.database.deleteDepartmentsSurveysBySurveyId(survey.id);
            if(result){
                const result=await req.database.createDepartmentSurvey(createQueryString(department_ids,survey.id));
                if(result) return  res.status(201).json({"id":survey.id,"name":survey.name});
            }
        } 
    } catch (error) {
        res.status(500).json({"message":error});
    }
}
module.exports=updateSurveyById;