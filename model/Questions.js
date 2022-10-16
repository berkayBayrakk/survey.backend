const connectionMysql=require('../config/mysqlConnection');

const createQuestion=async(question)=>{
    const queryString=`INSERT INTO questions (title,survey_id,input_type_id)
    VALUES ('${question.title}',${question.survey_id},${question.input_type_id})`
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result); 
        })
    })
}

const getQuestionBySurvey=async(survey_id)=>{
    const queryString=`SELECT * FROM questions
    WHERE survey_id=${survey_id}`;
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result); 
        })
    })
}

const getQuestionById=async(id)=>{
    const queryString=`SELECT * FROM questions
    WHERE id=${id}`;
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result); 
        })
    })
}

const getQuestions = async()=>{
    const queryString = "SELECT * FROM questions";
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
}

module.exports={createQuestion,getQuestionBySurvey,getQuestionById,getQuestions};