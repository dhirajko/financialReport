require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true })
  .then(() => {console.log("connected to database");
  })
  .catch((err)=>{
      console.log(err);
      g
  }
  )
};

module.exports =dbConnection;