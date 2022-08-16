const jwt=require('jsonwebtoken');
const {getUserByUsername}=require('../../model/Users');

const refreshHandler=async(req,res)=>{
    const username=req.body.username;
    const usersFind=await getUserByUsername(username);
    if(!usersFind) return res.sendStatus(401);
    const refresh_token=usersFind.refresh_token;
    if(!refresh_token) return res.sendStatus(403);
    jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decode)=>{
            if(err ||(decode.username!==username)) return res.sendStatus(403);
            const accessToken=jwt.sign(
                {
                    "UserInfo":{
                        "username":usersFind.username,
                        "name": usersFind.name,
                        "role_id":usersFind.role_id,
                        "department_id":usersFind.department_id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'15m'}
            );
            res.json({accessToken});
        }
        )
}

module.exports=refreshHandler;