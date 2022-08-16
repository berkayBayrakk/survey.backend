/**
 * Parameter contains role id's which has an authority
 * @param  {...any} roles 
 * @returns 
 */
const verifyRoles=(...roles)=>{
    return (req,res,next)=>{
        const userRole=req?.role_id;
        if(!userRole) return res.sendStatus(401);
        const result=roles.includes(userRole);
        if(!result)return res.sendStatus(401); 
        next();
    }   
}
module.exports = verifyRoles;