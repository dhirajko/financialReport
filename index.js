const express= require('express')
const app=express();
require('dotenv').config()
const dbConnection=require('./startup/db')
const user=require('./router/user')
const personalDetail=require('./router/personalDetail')
const startupMiddleware=require('./startup/applicationMiddleware')


startupMiddleware(express,app);

//user defined api
app.use('/api/user',user)
app.use('/api/personal-detail',personalDetail)

dbConnection()
app.listen(process.env.PORT, ()=>{
    console.log('Listening to port : ',process.env.PORT);       
})
    
