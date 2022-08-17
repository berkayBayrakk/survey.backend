require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT||3000;
const {connectRedis}=require('./config/redisConnection');
const connectionMysql=require('./config/mysqlConnection');
const verifyJWT=require('./middleware/verifyJWT');
connectRedis().then(obj=>{}).finally();
connectionMysql.connect(function(err){
    if(err) console.error(err);
    console.log('Server connected to mysql');
});

//built-in middleware
app.use(express.json());

//routes
app.use('/roles',require('./routes/roles'));
app.use('/auth',require('./routes/auth'));
app.use(verifyJWT);
app.use('/survey',require('./routes/survey'));
app.use('/answer',require('./routes/answer'));

app.listen(PORT,()=>{
    console.log('Server is running on port'+PORT);
});

