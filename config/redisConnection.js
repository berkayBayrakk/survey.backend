const Redis=require('redis');

const client = Redis.createClient();

const connectRedis=async()=>{
    client.connect().then((obj)=>{
        
    })
}

module.exports ={connectRedis,client};