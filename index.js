const express= require('express')
const app=express();
require('dotenv').config()
const dbConnection=require('./startup/db')
const startupMiddleware=require('./startup/applicationMiddleware')
const api=require('./startup/routers')
const server=require('./startup/serverSetup/serverStart')

app.get('/',function(req,res){    
    res.writeHead(301,
        {Location: 'https://financial-report.herokuapp.com'}
      );
     res.end();
})


startupMiddleware(express,app);
api(app);
dbConnection()
server(app)


// app.listen(process.env.PORT, ()=>{
//     console.log('Listening to port : ',process.env.PORT);       
// })
    
