const bcrypt=require('bcrypt');
const usernameValidator=require('../../helper/usernameValidator');
const jwt=require('jsonwebtoken');
const loginHandler=async(req,res)=>{

    const{username,password}=req.body;
    if(!username || !password) return res.status(400).json({'message':'Username and password are required'});
    try {
        const users=await req.database.getUsersList();
        const usernameExist= usernameValidator(username,users);
        if(usernameExist) return res.sendStatus(401);
        
        const userFinded=await req.database.getUserByUsername(username);

        //compare passwords
        const resultPswrd=await bcrypt.compare(password,userFinded.password);
        
        if(!resultPswrd) return res.status(401).json({'message':'Password is not correct'});
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

        await req.database.updateUser(newUser.id,newUser.refresh_token);
        res.json({accessToken});  
        return
        
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }

}
module.exports=loginHandler;