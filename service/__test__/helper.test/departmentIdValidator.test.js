const departmentIdValidator=require('../../../helper/departmentIdValidator');

test('if id exist in database return true otherwise return false',()=>{
    const departments=[{id:1,name:'a'},{id:2,name:'b'},{id:3,name:'v'}];

    const result1=departmentIdValidator(1,departments);
    const result2=departmentIdValidator(55,departments);
    expect(result2).toBe(false);

    expect(result1).toBe(true);
})