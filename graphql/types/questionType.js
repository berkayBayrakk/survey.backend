const { GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLNonNull,GraphQLList } = require('graphql');

const { getChoiceBySingleQuestionId } = require('../../model/Choices');
const { getInputTypes } = require('../../model/Input_Types');

const ChoiceType = require('./choiceType');
const InputType = require('./inputType');

const QuestionType = new GraphQLObjectType({
    name:'Question',
    description:'Question of Survey',
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        survey_id:{type:GraphQLNonNull(GraphQLInt)},
        input_type_id:{type:GraphQLNonNull(GraphQLInt)},
        title:{type:GraphQLNonNull(GraphQLString)},
        choices:{
            type:GraphQLList(ChoiceType),
            resolve:(question)=>getChoiceBySingleQuestionId(question.id)
        },
        input_type:{
            type:InputType,
            resolve:async(question)=>(await getInputTypes()).find(input=>input.id===question.input_type_id)
        }
    })
})

module.exports = QuestionType;