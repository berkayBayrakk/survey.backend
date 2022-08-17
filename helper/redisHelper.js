const {client}=require('../config/redisConnection')

/**
 * Controls that key is exist in redis. İf there is not exist returns null otherwise returns value.
 * @param {*} key 
 * @returns 
 */
const isExistInRedis=async(key)=>{
    const result=await client.get(key,(error,d)=>{})
    return JSON.parse(result);
}

/**
 * Sets key-value pair in redis.
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
const setUpRedis=async(key,value)=>{
    const result =await client.setEx(key,3600,JSON.stringify(value));
    return result;
}

/**
 * Controls that all of keys are exist in redis.
 * @param {*} keys 
 */
const multipleExistInRedis=async(keys)=>{
    const result=await client.mGet(keys);
    let isValid=true;
    result.forEach(value=>{
        if(!value) isValid=false;
    });
    if(!isValid) return null;
    return JSON.parse(result);
}
/**
 * Sets multiple key value pairs in redis.
 * @param {*} keys 
 * @param {*} values 
 * @returns 
 */
const multipleSetRedis=async(keys,values)=>{
    const set=[]

    for(let i=0;i<keys.length;i++){
        set.push(keys[i])
        set.push(JSON.stringify(values[i]))
    }
    console.log(set);
    const result=await client.mSet(set)
   
    return result;
}

module.exports={isExistInRedis,setUpRedis,multipleExistInRedis,multipleSetRedis};