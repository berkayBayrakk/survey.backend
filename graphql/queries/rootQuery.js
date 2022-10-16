const { GraphQLObjectType,GraphQLList, GraphQLString,GraphQLInt } = require('graphql');


const {getUsersList,getUserByUsername} = require('../../model/Users');
const {getRolesList,getRoleById} = require('../../model/Roles');
const { getDepartmentsList } = require('../../model/Departments');
const { getChoices } = require('../../model/Choices');
const { getInputTypes } = require('../../model/Input_Types');
const { getQuestions } = require('../../model/Questions');
const { getSurveys } = require('../../model/Surveys');

const UserType = require('../types/userType')
const RoleType = require('../types/roleType');
const DepartmentType = require('../types/departmentType');
const InputType = require('../types/inputType');
const ChoiceType = require('../types/choiceType');
const QuestionType = require('../types/questionType');
const SurveyType = require('../types/surveyType');

const RootQuery = new GraphQLObjectType({
    name:'Root',
    description:'Root of query',
    fields:()=>({
        users:{
            type:new GraphQLList(UserType),
            description:'Users of company',
            resolve:()=>getUsersList()
        },
        user:{
            type:UserType,
            description:'User of company',
            args:{username:{type:GraphQLString}},
            resolve:(parent,args)=>getUserByUsername(args.username)
        },
        roles:{
            type:GraphQLList(RoleType),
            resolve:()=>getRolesList()
        },
        role:{
            type:RoleType,
            args:{id:{type:GraphQLInt}},
            resolve:(parent,args)=>getRoleById(args.id)
        },
        departments:{
            type:GraphQLList(DepartmentType),
            resolve:()=>getDepartmentsList()
        },
        department:{
            type:DepartmentType,
            args:{id:{type:GraphQLInt}},
            resolve:async(parent,args)=>(await getDepartmentsList()).find(department=>department.id===args.id)
        },
        input_type:{
            type:InputType,
            args:{id:{type:GraphQLInt}},
            resolve:async(parent,args)=>(await getInputTypes()).find(department=>department.id===args.id)
        },
        input_types:{
            type:GraphQLList(InputType),
            resolve:async()=>(await getInputTypes())
        },
        choices:{
            type: GraphQLList(ChoiceType),
            resolve:()=>getChoices()
        },
        questions:{
            type: GraphQLList(QuestionType),
            resolve:()=>getQuestions()
        },
        question:{
            type: QuestionType,
            args:{id:{type:GraphQLInt}},
            resolve:async(parent,args)=>(await getQuestions()).find(question=>question.id===args.id)
        },
        survey:{
            type: SurveyType,
            args:{id:{type:GraphQLInt}},
            resolve:async(parent,args)=>(await getSurveys()).find(survey=>survey.id===args.id)
        }

    })
})

module.exports = RootQuery;