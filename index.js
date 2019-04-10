const express= require('express')
const app=express();
require('dotenv').config()
const dbConnection=require('./startup/db')
const startupMiddleware=require('./startup/applicationMiddleware')
const api=require('./startup/routers')


startupMiddleware(express,app);
api(app);



dbConnection()
app.listen(process.env.PORT, ()=>{
    console.log('Listening to port : ',process.env.PORT);       
})
    
