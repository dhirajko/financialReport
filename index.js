const express = require("express");
const app = express();
require("dotenv").config();
const dbConnection = require("./startup/db");
const startupMiddleware = require("./startup/applicationMiddleware");
const api = require("./startup/routers");
const server = require("./startup/serverSetup/serverStart");
const path = require("path");

startupMiddleware(express, app);
api(app);
dbConnection();
app.use(express.static(path.join(__dirname, "./client/build")));
/*React root*/
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "./client/build/index.html"));
});
server(app);
