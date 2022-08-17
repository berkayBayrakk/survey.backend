const connectionMysql=require('../config/mysqlConnection');
const {isExistInRedis,setUpRedis,multipleExistInRedis}=require('../helper/redisHelper');

const getRolesList=async()=>{

    const isExist=await isExistInRedis('roles');
    if(!isExist){
        const getRolesString='SELECT id,name as role_name FROM roles';
        return await new Promise((resolve,reject)=>{
            connectionMysql.query(getRolesString,async function(error,result){
                if(error) reject(error);
                await setUpRedis('roles',result)
                resolve(result);
            })
        })
    }
    return isExist;

};

module.exports={getRolesList};
