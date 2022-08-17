const {getRolesList}= require('../../model/Roles');

const getRoles=async(req,res)=>{
    try {
        const roles=await getRolesList();
        res.json(roles);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports={getRoles};