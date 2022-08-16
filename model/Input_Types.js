const connectionMysql=require('../config/mysqlConnection');

const getInputTypes=async()=>{
    const queryString='SELECT * FROM input_types';
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(error,result){
            if(error)reject(error);
            resolve(result);
        })
    })
}

module.exports={getInputTypes};