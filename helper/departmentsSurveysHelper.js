
/**
 * Creates string that query of create departments_surveys element with department ids and survey id
 * @param {*} department_ids 
 * @param {*} survey_id 
 */
const createQueryString=(department_ids,survey_id)=>{   
    
    let createDepartmentsSurveysString="INSERT INTO departments_surveys(department_id,survey_id) VALUES";
        
    department_ids.forEach(department_id => {
        createDepartmentsSurveysString+=`(${department_id},${survey_id}),`
    });
    createDepartmentsSurveysString=createDepartmentsSurveysString.slice(0, -1);
    return createDepartmentsSurveysString;
}

module.exports={createQueryString};