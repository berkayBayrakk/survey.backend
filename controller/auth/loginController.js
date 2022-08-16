const bcrypt=require('bcrypt');
const usernameValidator=require('../../helper/usernameValidator');
const {getUserByUsername,deleteUserById,createUser,updateUser}=require('../../model/Users');
const jwt=require('jsonwebtoken');
const loginHandler=async(req,res)=>{

    const{username,password}=req.body;
    if(!username || !password) return res.status(400).json({'message':'Username and password are required'});
    try {
        const usernameExist=await usernameValidator(username);
        if(usernameExist) return res.sendStatus(401);
        
        const userFinded=await getUserByUsername(username);

        //compare passwords
        const resultPswrd=await bcrypt.compare(password,userFinded.password);
        
        if(!resultPswrd) return res.sendStatus(401);
        req.username=userFinded.username;
        const accessToken=jwt.sign(
            {
                "UserInfo":{
                    "username":userFinded.username,
                    "name": userFinded.name,
                    "role_id":userFinded.role_id,
                    "department_id":userFinded.department_id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'15m'}
        );
        const refreshToken=jwt.sign(
            {"username":userFinded.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        //update database put refresh token

        const newUser={...userFinded,'refresh_token':refreshToken};

        const result=await updateUser(newUser.id,newUser.refresh_token);
        
        if(result){
            res.json({accessToken});  
        } 
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }

}
module.exports=loginHandler;