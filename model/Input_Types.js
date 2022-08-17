const connectionMysql=require('../config/mysqlConnection');
const {isExistInRedis,setUpRedis}=require('../helper/redisHelper');

const getInputTypes=async()=>{
    const isExist=await isExistInRedis('input_types');
    const queryString='SELECT * FROM input_types';
    if(!isExist){
        return await new Promise((resolve,reject)=>{
            connectionMysql.query(queryString,async function(error,result){
                if(error)reject(error);
                await setUpRedis('input_types',result);
                resolve(result);
            })
        })
    }
    return isExist;

}

module.exports={getInputTypes};