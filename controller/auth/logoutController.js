
const logoutHandler=async(req,res)=>{
    try {
        const findUser=await req.database.getUserByUsername(req.username);
        const newUser={...findUser,refresh_token:''};
        const result =await req.database.deleteUserById(findUser.id);
        if(result){
            const result=await req.database.createUser(newUser);
            if(result){
                res.json({"message":"Logout clearly"});
                return;
            }
        }
    } catch (error) {
        
    }

}

module.exports=logoutHandler;