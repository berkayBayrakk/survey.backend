const {getRolesList}= require('../../model/Roles');

const getRoles=(req,res)=>{
    try {
        const roles=getRolesList();
        res.json(JSON.stringify(roles));
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports={getRoles};