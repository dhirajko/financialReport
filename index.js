const express= require('express')
const app=express();
require('dotenv').config()
const dbConnection=require('./startup/db')










dbConnection()
app.listen(process.env.PORT, ()=>{
    console.log('Listening to port : ',process.env.PORT);       
})
    
