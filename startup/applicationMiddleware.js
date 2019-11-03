const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const applicationMiddleware = (express, app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.use(express.static(path.join(__dirname, '../client/public')));
  app.use(helmet());
  app.use(cors());
  
};

module.exports = applicationMiddleware;
