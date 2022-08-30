
const getRoles=async(req,res)=>{
    try {
        const roles=await req.database.getRolesList();
        return res.json(roles);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports={getRoles};