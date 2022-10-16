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

const getRoleById = async(id)=>{
   
    const isExist=await isExistInRedis(`role?${id}`);
    if(!isExist){
        const getRolesString=`SELECT id,name as role_name FROM roles WHERE id=${id}`;
        return await new Promise((resolve,reject)=>{
            connectionMysql.query(getRolesString,async function(error,result){
                if(error) reject(error);
                else{
                    if(result.length>0){
                        await setUpRedis('roles',result[0])
                        resolve(result[0]);
                    }
                    
                    
                }
                
            })
        })
    }
    return isExist;

};

module.exports={getRolesList,getRoleById};
