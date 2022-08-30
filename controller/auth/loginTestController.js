const jwt=require('jsonwebtoken');


const loginTestHandler=async(req,res)=>{

    const{username,role_id,department_id,name}=req.body;
    
    req.username=username;
    const accessToken=jwt.sign(
        {
            "UserInfo":{
                "username":username,
                "name": name,
                "role_id":role_id,
                "department_id":department_id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'15m'}
    );
    
    res.json({accessToken});  
    return
}
module.exports=loginTestHandler;