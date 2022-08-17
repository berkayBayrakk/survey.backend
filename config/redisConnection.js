const Redis=require('redis');

const client = Redis.createClient();

const connectRedis=async()=>{
    client.connect().then((obj)=>{
        console.log('Redis Connected')
    })
}

module.exports ={connectRedis,client};