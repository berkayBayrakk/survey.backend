const passwordValidator=require('../../../helper/passwordValidator');

test('retrun false if length is less than 8',()=>{
    expect(passwordValidator('1234567')).toBe(false)
})

test('retrun false if it does not containt any letter',()=>{
    expect(passwordValidator('123456789')).toBe(false)
})

test('retrun false if it does not containt any number',()=>{
    expect(passwordValidator('asdfghjkl')).toBe(false)
})

test('retrun true if length greater than 8 and contain number and letter',()=>{
    expect(passwordValidator('12345678asdfghjkl')).toBe(true)
})