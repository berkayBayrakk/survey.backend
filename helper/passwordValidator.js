/**
 * password should be at least 8 characters and contains at least one letter and one number
 * @param {*} password 
 */
const passwordValidator=(password)=>{
    const lenght=(password.length>=8)
    const letter=/[a-zA-Z]/.test(password);
    const number=/\d/.test(password);
    return lenght&& letter&&number
}

module.exports=passwordValidator;