const {getUsersList} =require('../model/Users');

/**
 * Gets user table on database. Checks that username is exist or not.
 * @param {*} username 
 * @returns !exist
 */
async function usernameValidator(username){
    const users=await getUsersList();
    const list=[...users];
    const result=list.find(user=>user.username===username);
    if(result){
        return false;
    }
    return true;

}

module.exports=usernameValidator;