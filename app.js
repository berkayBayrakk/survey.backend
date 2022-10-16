const express=require('express');

const bodyParser = require('body-parser');

const { graphqlHTTP } = require('express-graphql');

const verifyJWT=require('./middleware/verifyJWT');

const {connectRedis}=require('./config/redisConnection');

const connectionMysql=require('./config/mysqlConnection');

const passDatabaseToRequest=require('./middleware/passDatabaseToRequest');

const RootQuery = require('./graphql/queries/rootQuery');
const { GraphQLSchema } = require('graphql');

const {getSurveyById} =require('./model/Surveys');
const { getDepartmentsList } = require('./model/Departments');
function app(database){
    const app=express();
    
    //app.use(express.json());
    
    const bodyParser = require('body-parser');

    app.use(bodyParser.json()); // application/json
    console.log(bodyParser.json())
    connectRedis().then(obj=>{}).finally();
    
    connectionMysql.connect(function(err){
        console.log(err)
    });
    
    app.use(passDatabaseToRequest(database))
    
    app.use('/graphql',graphqlHTTP({
        graphigl:'development',
        schema: new GraphQLSchema({
            query:RootQuery
        })
    }))
    //routes
    app.use('/roles',require('./routes/roles'));
    app.use('/auth',require('./routes/auth'));
    app.use(verifyJWT);
    app.use('/survey',require('./routes/survey'));
    app.use('/answer',require('./routes/answer'));
    //getSurveyById(13).then(obj=>console.log(obj))

    return app;
}
module.exports =app;