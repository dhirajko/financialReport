const user = require("../router/user");
const accounts = require("../router/account");
const statement = require("../router/statement");
// const personalDetail = require("../router/personalDetail");
const login = require("../router/login");
const transactions = require("../router/transaction");
// const profitAndLossStatus = require("../router/profitandlossStatus");
// const apidocs = require("../router/apidoc");
// const trialBalace = require("../router/trialBalance");

function routers(app) {
  app.use("/api/user", user);
  app.use("/api/accounts", accounts);
  app.use("/api/transactions", transactions);
  app.use("/api/statement", statement);
  app.use("/api/login", login);
  // app.use("/api/personaldetail", personalDetail);
  // app.use("/api/profit", profitAndLossStatus);
  // app.use("/api/trialbalance", trialBalace);
}

module.exports = routers;
