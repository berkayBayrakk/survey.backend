const bcrypt=require('bcrypt');
const usernameValidator=require('../../helper/usernameValidator');
const departmentIdValidator=require('../../helper/departmentIdValidator');
const {createUser}=require('../../model/Users');
const roleList=require('../../config/Role_List');
const registerHandler=async(req,res)=>{
    const {username,password,name,department_id}=req.body;
    if(!username || !password || !name || !department_id){
       return res.status(400).json({'message':'Username and password are required'});
    }
    try {
        const isValidUsername=await usernameValidator(username);
        if(!isValidUsername) return res.status(409).json({"message":"Username is already exist."});

        const isValidDepartmentId=await departmentIdValidator(department_id);
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
        const result=await createUser(user);
        if(result) res.status(201).json({"success":`New user ${username} created.`});

    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}
module.exports=registerHandler;