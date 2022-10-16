const { GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLNonNull } = require('graphql');

const InputType = new GraphQLObjectType({
    name:'InputType',
    description:'Input Type of Question',
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        type_name:{type:GraphQLNonNull(GraphQLString)}
    })
})

module.exports = InputType;