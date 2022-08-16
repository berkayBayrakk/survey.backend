const mysql=require('mysql');
const connectionMysql= mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:'survey_db'
    
});
module.exports=connectionMysql;