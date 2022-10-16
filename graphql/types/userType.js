const { GraphQLObjectType,GraphQLString,GraphQLInt } = require('graphql');

const RoleType=require('./roleType')
const DepartmentType = require('./departmentType')

const {getRoleById} =require('../../model/Roles')
const {getDepartmentsList} = require('../../model/Departments')

const UserType = new GraphQLObjectType({
    name:'User',
    description:'User of company',
    fields:()=>({
        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        username:{type:GraphQLString},
        password:{type:GraphQLString},
        role_id:{type:GraphQLInt},
        role:{
            type:RoleType,
            resolve:async(user)=>(await getRoleById(user.role_id))
        },
        department_id:{type:GraphQLInt},
        department:{
            type:DepartmentType,
            resolve:async(user)=>(await getDepartmentsList()).find(department=>department.id===user.department_id)
        },
        refresh_token:{type:GraphQLString}
    })
})

module.exports = UserType;
