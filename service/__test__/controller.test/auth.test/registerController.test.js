const request=require('supertest');
const {jest: requiredJest} =require('@jest/globals')
const createApp=require('../../../../app');

const getUsersList=requiredJest.fn().mockReturnValue(
    [
    {username:'u1',password:'p',name:'n',department_id:1},
    {username:'u2',password:'p',name:'n',department_id:1},
    {username:'u3',password:'p',name:'n',department_id:1},
    {username:'u4',password:'p',name:'n',department_id:1}
    ]
);
const getDepartmentsList=requiredJest.fn().mockReturnValue(
    [{id:1,name:"a"}, {id:2,name:"b"}, {id:3,name:"c"}, {id:4,name:"d"}]
);
const createUser=requiredJest.fn();

const app=createApp({
    getUsersList,
    getDepartmentsList,
    createUser
})

describe('register controller test',()=>{
    beforeEach(()=>{
        
    })
    test('respons should return status code 400 if req.body is not valid',async ()=>{
        const bodies=[
            {username:'u',password:'p',name:'n'},
            {username:'u',password:'p',department_id:1},
            {username:'u',name:'n',department_id:1},
            {password:'p',name:'n',department_id:1},

            {name:'n',department_id:1},
            {username:'u',department_id:1},
            {password:'p',department_id:1},
            {username:'u',name:'n'},
            {username:'u',password:'p'},
            {password:'p',name:'n'},

            {username:'u'},
            {password:'p'},
            {name:'n'},
            {department_id:1},
            {}
        ];
        for(const body of bodies){
            const response=await request(app).post('/auth/register').send(body);
            expect(response.statusCode).toBe(400)
        }
    });


    test('when create new user should return id',async()=>{
        const body={username:'u',password:'password123',name:'n',department_id:1};
        createUser.mockReset();
        createUser.mockReturnValue({insertId:1})
        const response=await request(app).post('/auth/register').send(body);
        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBe(1);
        expect(createUser.mock.calls.length).toBe(1);

    });
    test('should return 409 if username is exist ',async()=>{
        const body={username:'u1',password:'password12345',name:'n',department_id:1};
        createUser.mockReturnValue({insertId:1})
        const response=await request(app).post('/auth/register').send(body);
        
        expect(response.statusCode).toBe(409)
        
    });
})