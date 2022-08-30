const request=require('supertest');
const {jest: requiredJest} =require('@jest/globals')
const createApp=require('../../../../app');
require('dotenv').config();

const getSurveyByDepartmentId=requiredJest.fn();

const app=createApp({
    getSurveyByDepartmentId
});

describe('Get survey by id test',()=>{
    let token='';
    beforeAll(async () => {
        const response = await request(app).post('/auth/login/test').send(
            {username:'username',role_id:3,department_id:1,name:'name'})
         token = response.body.accessToken;
      });
    
    test('Method getSurveyByDepartmentId should be called one time and parameter should be department_id',async()=>{
        getSurveyByDepartmentId.mockReturnValue(true);
        await request(app).get('/survey').send({})
        .set({'authorization':`Bearer ${token}`});
        expect(getSurveyByDepartmentId.mock.calls.length).toBe(1);
        expect(getSurveyByDepartmentId.mock.calls[0][0]).toBe(1);
    });

    test('Valid function should return json element',async()=>{
        getSurveyByDepartmentId.mockReset();
        getSurveyByDepartmentId.mockReturnValue({name:'name',id:1});
        const response=await request(app).get('/survey').send({})
        .set({'authorization':`Bearer ${token}`});
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    })
})