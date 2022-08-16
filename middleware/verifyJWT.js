const jwt=require('jsonwebtoken');

const verifyJWT=(req,res,next)=>{
   const authHeader= req.headers.authorization||req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')){
        return res.sendStatus(401); //token does not exist
    }
    const token =authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decode)=>{
            if(err) return res.sendStatus(403); //token does not exist
            req.username=decode.UserInfo.username;
            req.name=decode.UserInfo.name;
            req.role_id=decode.UserInfo.role_id;
            req.department_id=decode.UserInfo.department_id;
            next();
    });
}

module.exports=verifyJWT;