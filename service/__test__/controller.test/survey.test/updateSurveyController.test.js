const request=require('supertest');
const {jest: requiredJest} =require('@jest/globals')
const createApp=require('../../../../app');
require('dotenv').config();
const {createQueryString} =require('../../../../helper/departmentsSurveysHelper');

const getSurveyById=requiredJest.fn();
const getDepartmentsList=requiredJest.fn();
const deleteDepartmentsSurveysBySurveyId=requiredJest.fn();
const createDepartmentSurvey=requiredJest.fn();
const updateSurvey=requiredJest.fn();

const app=createApp({
    getSurveyById,
    getDepartmentsList,
    deleteDepartmentsSurveysBySurveyId,
    createDepartmentSurvey,
    updateSurvey
});

describe('Update Survey Test',()=>{
    const id=3
    let token='';
    beforeAll(async () => {
        const response = await  request(app).post('/auth/login/test').send(
            {username:'username',role_id:3,department_id:1,name:'name'})
         token = response.body.accessToken;
      });
    
    test('Get survey by id should return one time and parameter should be id which in params and if not exist return 401',async()=>{
        
        const response=await request(app).put(`/survey/${id}`).send()
        .set({'authorization':`Bearer ${token}`})
        expect(getSurveyById.mock.calls.length).toBe(1);
        expect(getSurveyById.mock.calls[0][0]).toBe(id.toString());
        expect(response.statusCode).toBe(401);

    });
    test('Date formats are invalid',async()=>{
        getSurveyById.mockReturnValue({id:3})
        const bodies=[
            {name:'n',end_date:'11-01-2020',start_date:'11-01-2021',description:'d',department_ids:[]},
            {name:'n',end_date:'11/01/2020',start_date:'11/01/2021',description:'d',department_ids:[]},
        ]
        for(const body of bodies){
            const response=await request(app).put(`/survey/${id}`).send(body)
            .set({'authorization':`Bearer ${token}`});
            expect(response.statusCode).toBe(400)
        }
    });

    test('Department ids are not valid',async()=>{
        getDepartmentsList.mockReturnValue([{id:1},{id:2},{id:3},{id:4}]);
        const body={name:'n',end_date:'2020-01-01',start_date:'2020-01-05',description:'d',department_ids:[1,5,8,10]};
        const response=await request(app).put(`/survey/${id}`).send(body)
        .set({'authorization':`Bearer ${token}`});
        expect(response.statusCode).toBe(400)

    });
    test('Update survey, delete and create departments surveys are successfully worked',async()=>{
        updateSurvey.mockReset();
        createDepartmentSurvey.mockReset();
        deleteDepartmentsSurveysBySurveyId.mockReset();
        
        updateSurvey.mockReturnValue(true);
        deleteDepartmentsSurveysBySurveyId.mockReturnValue(true);
        createDepartmentSurvey.mockReturnValue(true);
        

        const body={name:'name',end_date:'2020-01-01',start_date:'2020-01-05',description:'des',department_ids:[1]};
        
        const response=await request(app).put(`/survey/${id}`).send(body)
        .set({'authorization':`Bearer ${token}`});
        
        const survey={name:body.name,start_date:body.start_date,end_date:body.end_date,description:body.description,id:id.toString()};
        
        const queryString=createQueryString(body.department_ids,survey.id)
        
        expect(updateSurvey.mock.calls.length).toBe(1);
        expect(updateSurvey.mock.calls[0][0]).toEqual(survey);

        expect(deleteDepartmentsSurveysBySurveyId.mock.calls.length).toBe(1);
        expect(deleteDepartmentsSurveysBySurveyId.mock.calls[0][0]).toEqual(survey.id);

        expect(createDepartmentSurvey.mock.calls.length).toBe(1);
        expect(createDepartmentSurvey.mock.calls[0][0]).toEqual(queryString);
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({id:survey.id,name:survey.name});
    })
})
