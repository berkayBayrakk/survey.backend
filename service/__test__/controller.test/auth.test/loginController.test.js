const request=require('supertest');
const bcrypt=require('bcrypt');
const {jest: requiredJest} =require('@jest/globals')
const createApp=require('../../../../app');

const getUsersList=requiredJest.fn().mockReturnValue(
    [
        {username:'u1',password:'password12345',name:'n',department_id:1},
        {username:'u2',password:'p',name:'n',department_id:1},
        {username:'u3',password:'p',name:'n',department_id:1},
        {username:'u4',password:'p',name:'n',department_id:1}
    ]
)

const getUserByUsername=requiredJest.fn();

const updateUser=requiredJest.fn();

const app=createApp({
    getUsersList,
    getUserByUsername,
    updateUser
});

describe('Login Controller test',()=>{
    test('req body is not valid return 400',async()=>{
        const bodies=[
            {},
            {username:'u'},
            {password:'p'}
        ]
        for(const body of bodies){
            const response=await request(app).post('/auth/login').send(body);
            expect(response.statusCode).toBe(400);
        }
    });
    test('username is not valid return 401',async()=>{
        const body={username:'berkay',password:'berkay123456'};
        const response=await request(app).post('/auth/login').send(body);
        expect(response.statusCode).toBe(401);
    });
    test('password is not correct return 401',async()=>{
        getUserByUsername.mockReturnValue({username:'u1',password:'password12345'})
        const body={username:'u1',password:'password123451111111111'};
        const response=await request(app).post('/auth/login').send(body);
        expect(response.statusCode).toBe(401);

    });
    test('Login successfully',async()=>{
        const jwt=require('jsonwebtoken');
        require('dotenv').config();
        getUserByUsername.mockReset();
        const cryptedPswrd=await bcrypt.hash('password12345',10)
        getUserByUsername.mockReturnValue({id:1,username:'u1',password:cryptedPswrd,role_id:1,department_id:1,name:'n',refresh_token:'token'});
        updateUser.mockReturnValue(true);
        const body={username:'u1',password:'password12345'};
        const response=await request(app).post('/auth/login').send(body);
        const refreshToken=jwt.sign(
            {"username":'u1'},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        const accessToken=jwt.sign(
            {
                "UserInfo":{
                    "username":'u1',
                    "name": 'n',
                    "role_id":1,
                    "department_id":1
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'15m'}
        );
        expect(updateUser.mock.calls[0][0]).toBe(1);
        expect(updateUser.mock.calls[0][1]).toBe(refreshToken);
        expect(response.body.accessToken).toBe(accessToken);
    })
})