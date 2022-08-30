require('dotenv').config();
const PORT=process.env.PORT||3000;

const appCreate=require('./app');
const database=require('./database');
const app=appCreate(database);
app.listen(PORT,()=>{
    //console.log('Server runing on port '+PORT)
});

module.exports=app;