const request=require('supertest');
const {jest: requiredJest} =require('@jest/globals')
const createApp=require('../../../../app');
require('dotenv').config();
const {createQueryString} =require('../../../../helper/departmentsSurveysHelper');

const createDepartmentSurvey=requiredJest.fn();
const getDepartmentsList=requiredJest.fn();
const createSurvey=requiredJest.fn();
const app=createApp({
    createDepartmentSurvey,
    getDepartmentsList,
    createSurvey
})

describe('Create survey test',()=>{
    let token='';
    beforeAll(async () => {
        const response = await  request(app).post('/auth/login/test').send(
            {username:'username',role_id:3,department_id:1,name:'name'})
         token = response.body.accessToken;
      });

    test('Request body test',async()=>{
        const bodies=[
            {name:'n',end_date:'e',start_date:'s',description:'d'},
        
        ]
        for(const body of bodies){
            const response=await request(app).post('/survey').send(body)
            .set({'authorization':`Bearer ${token}`})
            expect(response.statusCode).toBe(400)
        }
    });

    test('Date formats are invalid',async()=>{
        const bodies=[
            {name:'n',end_date:'11-01-2020',start_date:'11-01-2021',description:'d',department_ids:[]},
            {name:'n',end_date:'11/01/2020',start_date:'11/01/2021',description:'d',department_ids:[]},
        ]
        for(const body of bodies){
            const response=await request(app).post('/survey').send(body)
            .set({'authorization':`Bearer ${token}`});
            expect(response.statusCode).toBe(400)
        }
    });

    test('Department ids are not valid',async()=>{
        getDepartmentsList.mockReturnValue([{id:1},{id:2},{id:3},{id:4}]);
        const body={name:'n',end_date:'2020-01-01',start_date:'2020-01-05',description:'d',department_ids:[1,5,8,10]};
        const response=await request(app).post('/survey').send(body)
            .set({'authorization':`Bearer ${token}`});
            expect(response.statusCode).toBe(400)

    });

    test('Create survey should call one time and parameter must be survey',async()=>{
        createSurvey.mockReset();
        getDepartmentsList.mockReset();
        getDepartmentsList.mockReturnValue([{id:1},{id:2}]);
        
        const body={name:'name',end_date:'2020-01-01',start_date:'2020-01-05',description:'des',department_ids:[1]};
        
        await request(app).post('/survey').send(body)
        .set({'authorization':`Bearer ${token}`});
        
        expect(createSurvey.mock.calls.length).toBe(1);
        
        body.name
        const survey={
            name:body.name,
            start_date:body.start_date,
            end_date:body.end_date,
            description:body.description
        }
        
        expect(createSurvey.mock.calls[0][0]).toEqual(survey)

    });

    test('createDepartmentSurvey should be called one time and parameter must be spesific string',async()=>{
        createSurvey.mockReturnValue({insertId:1});
        createDepartmentSurvey.mockReset();

        const body={name:'name',end_date:'2020-01-01',start_date:'2020-01-05',description:'des',department_ids:[1]};

        await request(app).post('/survey').send(body)
        .set({'authorization':`Bearer ${token}`});
        
        const parameter=createQueryString(body.department_ids,1);

        expect(createDepartmentSurvey.mock.calls.length).toBe(1);
        expect(createDepartmentSurvey.mock.calls[0][0]).toBe(parameter)
    });

    test('Valid method should retrun status 201 and send json object that has id and name',async()=>{
        getDepartmentsList.mockReset();
        getDepartmentsList.mockReturnValue([{id:1},{id:2}]);
        createSurvey.mockReset();
        createSurvey.mockReturnValue({insertId:1});
        
        const body={name:'name',end_date:'2020-01-01',start_date:'2020-01-05',description:'des',department_ids:[1]};
        
        const response=await request(app).post('/survey').send(body)
        .set({'authorization':`Bearer ${token}`});

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({"id":1,"name":body.name})

    })
})