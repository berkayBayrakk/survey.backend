const connectionMysql=require('../config/mysqlConnection');
const {isExistInRedis,setUpRedis,multipleExistInRedis,multipleSetRedis}=require('../helper/redisHelper');

const createChoicesByQuestionId=async(questionId,choices)=>{
    let queryString='INSERT INTO choices (title,question_id) VALUES';
    choices.forEach(title => {
        queryString+=`('${title}',${questionId}),`;       
    });
    queryString=queryString.slice(0, -1);
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })
}

const getChoiceBySingleQuestionId = async(questionId)=>{
    const queryString=`SELECT * FROM choices WHERE question_id=${questionId}`;
    const isExist = await isExistInRedis(`choice?questionId=${questionId}`);
    
    if(!isExist){
        return await new Promise((resolve,reject)=>{
            connectionMysql.query(queryString,async function(error,result){
                if(error) reject(error)
                await setUpRedis(`choice?questionId=${questionId}`,result)
                resolve(result)
            })
        })
    }
    else{
        return isExist
    }
}

const getChoicesByQuestionId=async(questionIds)=>{
    let questionIdArray='(';
    questionIds.forEach(id=>{
        questionIdArray+=`${id},`;
    });
    questionIdArray=questionIdArray.slice(0, -1);
    questionIdArray+=')';
    const arrKeys=questionIds.map(element=>`choice?questionId=${element}`);
    const isExist=await multipleExistInRedis(arrKeys);
    if(!isExist){
        const queryString=`SELECT * FROM choices WHERE question_id IN ${questionIdArray}`;
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

const getChoices = async()=>{
    const queryString = "SELECT * FROM choices";
    const result =await isExistInRedis('choices');
    if(!result){
        return await new Promise((resolve,reject)=>{
            connectionMysql.query(queryString,async function(error,result){
                if(error) reject(error);
                await setUpRedis('choices',result);
                resolve(result)
            })
        })
    }
    else{
        return result;
    }
}
module.exports={createChoicesByQuestionId,getChoicesByQuestionId,getChoices,getChoiceBySingleQuestionId};