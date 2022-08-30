const usernameValidator=require('../../../helper/usernameValidator');

test('if user exist return false otherwise return true',()=>{
    const users=[{username:'a'},{username:'b'},{username:'v'}]
    const result1=usernameValidator('berkay',users);
    const result2=usernameValidator('v',users);
    expect(result1).toBe(true);
    expect(result2).toBe(false);

})