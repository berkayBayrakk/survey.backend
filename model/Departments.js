const connectionMysql=require('../config/mysqlConnection');

const getDepartmentsString='SELECT id,name FROM departments';

const getDepartmentsList=async ()=>{
    return await new Promise((resolve,reject)=>{ 
        connectionMysql.query(getDepartmentsString,function(err,result){
            if(err) reject(err);
            resolve(result);        
        });
    })
};

module.exports={getDepartmentsList};