const connectionMysql=require('../config/mysqlConnection');
const {isExistInRedis,setUpRedis,multipleExistInRedis,multipleSetRedis}=require('../helper/redisHelper');

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

    const isExist=await isExistInRedis('answers');
    if(!isExist){
        return await new Promise((resolve,reject)=>{
            connectionMysql.query(queryString,async function(error,result){
                if(error) reject(error);
                await setUpRedis('answers',result);
                resolve(result);
            })
        })
    }
    return isExist;

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
//warning definitely check this method.
const getAnswersBySurvey=async(questionsIds)=>{
    let str=questionsIds.substring(1);
    str=str.slice(0,-1);
    const arrKeys=str.split(',').map(element=>`answer?questionId=${element}`);
    const isExist=await multipleExistInRedis(arrKeys);
    if(!isExist){
        const queryString=`SELECT * FROM answers WHERE question_id IN ${questionsIds}`
        return await new Promise((resolve,reject)=>{
            connectionMysql.query(queryString,async function(error,result){
                if(error) reject(error);
                await multipleSetRedis(arrKeys,result);
                resolve(result);
            })
        })
    }
    return isExist;

}
module.exports={createAnswer,getAnswers,updateAnswer,getAnswersBySurvey};