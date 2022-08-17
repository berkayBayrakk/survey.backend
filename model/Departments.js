const connectionMysql=require('../config/mysqlConnection');
const {isExistInRedis,setUpRedis}=require('../helper/redisHelper');

const getDepartmentsList=async ()=>{
    const getDepartmentsString='SELECT id,name FROM departments';

    const isValid=await isExistInRedis('departments');
    if(!isValid){
        return await new Promise((resolve,reject)=>{ 
            connectionMysql.query(getDepartmentsString,async function(err,result){
                if(err) reject(err);
                await setUpRedis('departments',result);
                resolve(result);        
            });
        })
    }
    return isValid;

};

module.exports={getDepartmentsList};