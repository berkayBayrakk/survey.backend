const bcrypt=require('bcrypt');
const passwordValidator=require('../../helper/passwordValidator');
const usernameValidator=require('../../helper/usernameValidator');
const departmentIdValidator=require('../../helper/departmentIdValidator');
const roleList=require('../../config/Role_List');
const registerHandler=async(req,res)=>{
    const {username,password,name,department_id}=req.body;
    if(!username || !password || !name || !department_id){
        res.status(400).json({'message':'Username and password are required'});
        return
    }
    try {
        const users=await req.database.getUsersList();
        const isValidUsername=usernameValidator(username,users);
        if(!isValidUsername) return res.status(409).json({"message":"Username is already exist."});

        //password should be at least 8 characters and contains at least one letter and one number
        const isValidPswrd=passwordValidator(password);
        if(!isValidPswrd) return res.status(400).json({'message':'Password is not valid'});
        
        const departments=await req.database.getDepartmentsList();
        const isValidDepartmentId= departmentIdValidator(department_id,departments);
        if(!isValidDepartmentId) return res.status(400).json({'message':'Department id is not valid'});

        //create new user
        const cryptedPassword=await bcrypt.hash(password,10);
        const user={
            name:name,
            username:username,
            department_id:department_id,
            password:cryptedPassword,
            role_id:roleList.user 
        };
        const result=await req.database.createUser(user);
        if(result) res.status(201).json({id:result.insertId});

    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}
module.exports=registerHandler;