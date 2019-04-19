const express= require('express')
const app=express();
require('dotenv').config()
const dbConnection=require('./startup/db')
const startupMiddleware=require('./startup/applicationMiddleware')
const api=require('./startup/routers')
const server=require('./startup/serverSetup/serverStart')


startupMiddleware(express,app);
api(app);
dbConnection()
server(app)
