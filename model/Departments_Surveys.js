const connectionMysql=require('../config/mysqlConnection');
const {isExistInRedis,setUpRedis}=require('../helper/redisHelper');

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
    const isExist=await isExistInRedis(`departmentssurveys?id${departmentId}`);
    if(!isExist){
        return await new Promise((resolve,reject)=>{
            connectionMysql.query(queryString,async function(error,result){
                if(error) reject(error);
                await setUpRedis(`departmentssurveys?id${departmentId}`,result);
                resolve(result);
            });
        });
    };
    return isExist;
}


module.exports={createDepartmentSurvey,deleteDepartmentsSurveysBySurveyId,getDepartmentsSurveys};
