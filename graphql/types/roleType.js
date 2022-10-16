const { GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLNonNull } = require('graphql');

const RoleType = new GraphQLObjectType({
    name:'Role',
    description:'Role of user',
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        role_name:{type:GraphQLNonNull(GraphQLString)}
    })
})

module.exports = RoleType;
