const request=require('supertest');
const {jest: requiredJest} =require('@jest/globals')
const createApp=require('../../../../app');

const getRolesList=requiredJest.fn();

const app=createApp({
    getRolesList
})

describe('Roles controller test',()=>{
    test('GetRoles test should return json',async()=>{
        getRolesList.mockReturnValue([{id:1,name:'a'}])
        const response=await request(app).get('/roles').send({});
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    
    });
    test('GetRoles test should call one time and there is no parameter',async()=>{
        getRolesList.mockReset();
        getRolesList.mockReturnValue([{id:1,name:'a'}])
        await request(app).get('/roles').send({});
        expect(getRolesList.mock.calls.length).toBe(1);
        expect(getRolesList.mock.calls[0][0]).toBe(undefined);
    
    })
})