const connectionMysql=require('../config/mysqlConnection');
const {isExistInRedis,setUpRedis}=require('../helper/redisHelper');

/**
 * Creates new survey 
 * @param {,name,start_date,end_date,description}: surveyObj 
 * @returns 
 */
const createSurvey=async(surveyObj)=>{
    const createSurveyString=`INSERT INTO surveys(name,start_date,end_date,description)
    VALUES ('${surveyObj.name}','${surveyObj.start_date}','${surveyObj.end_date}','${surveyObj.description}')`
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(createSurveyString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
}

const getSurveys = async()=>{
    const isExist=await isExistInRedis(`surveys`);
    if(!isExist){
        const getSurveyString=`SELECT * FROM surveys`;
        return await new Promise((resolve,reject)=>{
            connectionMysql.query(getSurveyString,async function(error,result){
                if(error) reject(error);
                await setUpRedis(`surveys`,result);
                resolve(result);
            })
        })
    }
    return isExist;
}

const getSurveyById=async(id)=>{
    const isExist=await isExistInRedis(`surveys?id:${id}`);
    if(!isExist){
        const getSurveyString=`SELECT * FROM surveys WHERE id=${id}`;
        return await new Promise((resolve,reject)=>{
            connectionMysql.query(getSurveyString,async function(error,result){
                if(error) reject(error);
                await setUpRedis(`surveys?id:${id}`,result);
                resolve(result);
            })
        })
    }
    return isExist;
}

const updateSurvey=async(survey)=>{
    const updateSurveyString=`UPDATE surveys 
    SET name='${survey.name}',end_date='${survey.end_date}',start_date='${survey.start_date}',description='${survey.description}' WHERE id=${survey.id}`;
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(updateSurveyString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
}

const getSurveyByDepartmentId=async(department_id)=>{
    const queryString=`SELECT s.id,s.name,s.end_date,s.start_date,s.description FROM surveys AS s
    JOIN departments_surveys AS ds
    WHERE ds.department_id=${department_id} AND s.id=ds.survey_id`;
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
}

module.exports={createSurvey,getSurveyById,updateSurvey,getSurveyByDepartmentId,getSurveys};