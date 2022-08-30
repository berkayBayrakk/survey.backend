const createDepartmentsSurveysString="INSERT INTO departments_surveys(department_id,survey_id) VALUES";

/**
 * Creates string that query of create departments_surveys element with department ids and survey id
 * @param {*} department_ids 
 * @param {*} survey_id 
 */
const createQueryString=(department_ids,survey_id)=>{   
    
    const finalString= department_ids.reduce((previusString,department_id)=>{
        return `${previusString}(${department_id},${survey_id}),`;
    },createDepartmentsSurveysString)

    return finalString.slice(0, -1);
}

module.exports={createQueryString};