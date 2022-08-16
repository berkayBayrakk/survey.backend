const {getUserByUsername,deleteUserById,createUser}=require('../../model/Users');

const logoutHandler=async(req,res)=>{
    try {
        const findUser=await getUserByUsername(req.username);
        const newUser={...findUser,refresh_token:''};
        const result =await deleteUserById(findUser.id);
        if(result){
            const result=await createUser(newUser);
            if(result){
                res.json({"message":"Logout clearly"});
            }
        }
    } catch (error) {
        
    }

}

module.exports=logoutHandler;