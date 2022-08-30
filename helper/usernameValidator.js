
/**
 * Gets user table on database. Checks that username is exist or not.
 * @param {*} username 
 * @returns !exist
 */
 function usernameValidator(username,users){
    return (!users.find(user=>user.username===username))
}

module.exports=usernameValidator;