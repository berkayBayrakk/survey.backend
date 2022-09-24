const express=require('express');

const { graphqlHTTP } = require('express-graphql');

const verifyJWT=require('./middleware/verifyJWT');

const {connectRedis}=require('./config/redisConnection');

const connectionMysql=require('./config/mysqlConnection');

const passDatabaseToRequest=require('./middleware/passDatabaseToRequest');


function app(database){
    const app=express();
    
    connectRedis().then(obj=>{}).finally();
    
    connectionMysql.connect(function(err){
        console.log(err)
    });
    
    app.use(passDatabaseToRequest(database))
    
    app.use('/graphql',graphqlHTTP({
        graphigl:true
    }))

    app.use(express.json());
    //routes
    app.use('/roles',require('./routes/roles'));
    app.use('/auth',require('./routes/auth'));
    app.use(verifyJWT);
    app.use('/survey',require('./routes/survey'));
    app.use('/answer',require('./routes/answer'));

    return app;
}
module.exports =app;