const connectionMysql=require('../config/mysqlConnection');

const getRolesString='SELECT id,name as role_name FROM roles';

const getRolesList=()=>{
    connectionMysql.query(getRolesString,function(err,result){
        if(err) throw err;
        return result;        
    });
};

module.exports={getRolesList};
