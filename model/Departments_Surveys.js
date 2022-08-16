const connectionMysql=require('../config/mysqlConnection');

const createDepartmentSurvey=async(qureyString)=>{
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(qureyString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
};

const deleteDepartmentsSurveysBySurveyId=async(id)=>{
    const queryString=`DELETE FROM departments_surveys WHERE survey_id=${id}`;
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
}

const getDepartmentsSurveys=async(departmentId)=>{
    const queryString=`select * from departments_surveys
    where department_id=${departmentId}`;
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
}


module.exports={createDepartmentSurvey,deleteDepartmentsSurveysBySurveyId,getDepartmentsSurveys};
