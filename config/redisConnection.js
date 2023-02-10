const Redis=require('redis');

const client = Redis.createClient({
    url:'redis://redis:6379'
});

const connectRedis=async()=>{
    client.connect().then((obj)=>{
        
    })
}




module.exports ={connectRedis,client};