const { GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLNonNull,GraphQLList } = require('graphql');

const { getQuestionBySurvey } = require('../../model/Questions');

const QuestionType = require('./questionType');

const SurveyType = new GraphQLObjectType({
    name:'Survey',
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)},
        end_date:{type:GraphQLNonNull(GraphQLString)},
        start_date:{type:GraphQLNonNull(GraphQLString)},
        description:{type:GraphQLNonNull(GraphQLString)},
        questions:{
            type:GraphQLList(QuestionType),
            resolve:(survey)=>getQuestionBySurvey(survey.id)
        }
    })  
})

module.exports = SurveyType;