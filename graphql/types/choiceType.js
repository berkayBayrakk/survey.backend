const { GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLNonNull } = require('graphql');

const ChoiceType = new GraphQLObjectType({
    name:'Choice',
    description:'Choice of Question',
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        question_id:{type:GraphQLNonNull(GraphQLInt)},
        title:{type:GraphQLNonNull(GraphQLString)}
    })
})

module.exports = ChoiceType;