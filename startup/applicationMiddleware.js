const applicationMiddleware = (express,app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
};

module.exports = applicationMiddleware;
