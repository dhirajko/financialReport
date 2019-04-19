const helmet = require('helmet');
const cors = require('cors');

const applicationMiddleware = (express,app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());
  app.use(cors());
};

module.exports = applicationMiddleware;
