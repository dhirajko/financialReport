const user = require("../router/user");
const accounts = require("../router/account");
const statement = require("../router/statement");
const login = require("../router/login");
const transactions = require("../router/transaction");

function routers(app) {
  app.use("/api/user", user);
  app.use("/api/accounts", accounts);
  app.use("/api/transactions", transactions);
  app.use("/api/statement", statement);
  app.use("/api/login", login);
}

module.exports = routers;
