const hasValidDepartmentIds=require('../../../helper/hasDepartmentIds');

describe('Has valid Department ids test',()=>{
    test('Parameters are valid',()=>{
        const arr1=[1,2,3];
        const arr2_db=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}];
        const arr3=[1,2,100];
        expect(hasValidDepartmentIds(arr1,arr2_db)).toBe(true);
        expect(hasValidDepartmentIds(arr3,arr2_db)).toBe(false);
    })
    test('Parameters are not valid',()=>{
        const arr1='bla bla'
        const arr3=123;
        const arr4=[];
        const arr2_db=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}];
        expect(hasValidDepartmentIds(arr1,arr2_db)).toBe(false);
        expect(hasValidDepartmentIds(arr3,arr2_db)).toBe(false);
        expect(hasValidDepartmentIds(arr4,arr2_db)).toBe(false);
    })
})