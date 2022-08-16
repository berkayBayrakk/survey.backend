const connectionMysql=require('../config/mysqlConnection');

const createAnswer=async(answerObj)=>{
    const queryString=`INSERT INTO answers(user_id,answer,question_id)
    VALUES (${answerObj.user_id},'${answerObj.answer}',${answerObj.question_id})`;
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
}
const getAnswers=async()=>{
    const queryString='SELECT * FROM answers';
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
}
const updateAnswer=async(id,answer)=>{
    const queryString=`UPDATE answers SET answer='${answer}' WHERE id=${id}`;
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
}

const getAnswersBySurvey=async(questionsIds)=>{
    const queryString=`SELECT * FROM answers WHERE question_id IN ${questionsIds}`
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
}
module.exports={createAnswer,getAnswers,updateAnswer,getAnswersBySurvey};