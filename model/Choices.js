const connectionMysql=require('../config/mysqlConnection');

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

const getChoicesByQuestionId=async(questionIds)=>{
    let questionIdArray='(';
    questionIds.forEach(id=>{
        questionIdArray+=`${id},`;
    });
    questionIdArray=questionIdArray.slice(0, -1);
    questionIdArray+=')';
    const queryString=`SELECT * FROM choices WHERE question_id IN ${questionIdArray}`;
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error) reject(error);
            resolve(result);
        })
    })

}
module.exports={createChoicesByQuestionId,getChoicesByQuestionId};