const connectionMysql=require('../config/mysqlConnection');
const {isExistInRedis,setUpRedis}=require('../helper/redisHelper');

/**
 * Gets user table on database
 * @returns 
 */
const getUsersList= async()=>{
    const getUsersString='SELECT * FROM users';

    const isExist=await isExistInRedis('users');
    if(!isExist){
        return await new Promise ((resolve,reject)=>{
            connectionMysql.query(getUsersString,async function(err,result){
                if(err) reject(err);
                await setUpRedis('users',result);
                resolve (result);         
            });
        })
    }
    return isExist;
};

/**
 * Gets user by username
 */
const getUserByUsername=async (username)=>{
    const users=await getUsersList();
    const findUser=users.find(user=>user.username===username);
    if(findUser) return findUser;
    return null;
}
/**
 * Delete user from user table
 * @param {*} id 
 */
const deleteUserById=async (id)=>{
    const deleteString=`DELETE FROM users WHERE id=${id}`;
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(deleteString,function(err,result){
            if(err) reject(err);
            resolve(result);
        })
    })
}
/**
 * Creates new user into user table.     
 * User has name,username,password,department_id,refresh_token(not required).
 * @param {*} user 
 * @returns 
 */
const createUser=async(user)=>{

    const createUserString=`INSERT INTO users(name,username,password,role_id,department_id,refresh_token) 
    VALUES ('${user.name}','${user.username}','${user.password}',${user.role_id},${user.department_id},'${user?.refresh_token}')`
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(createUserString,function(err,result){
            if(err) reject(err);
            resolve(result);
        })
    })
}
const updateUser=async(id,refresh_token)=>{
    const queryString=`UPDATE users SET refresh_token='${refresh_token}' WHERE id=${id}`;
    return await new Promise((resolve,reject)=>{
        connectionMysql.query(queryString,function(err,result){
            if(err) reject(err);
            resolve(result);
        })
    })
}

module.exports={getUsersList,getUserByUsername,deleteUserById,createUser,updateUser};