const { GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLNonNull } = require('graphql');


const DepartmentType = new GraphQLObjectType({
    name:'Department',
    description:'Department of user',
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)}
    })
})

module.exports = DepartmentType;