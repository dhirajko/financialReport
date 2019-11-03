const { Account } = require("../model/accounts");
const { failed, success } = require("../const/response");
const { accountValidator } = require("../utils/validator/account");

const readAccount = async () => {
  const accounts = await Account.find({});
  return success(200, accounts);
};

const readAccountById = async id => {
  const account = await Account.findOne({ _id: id }).select("-__v");
  return success(200, account);
};

const readAccountByUser = async id => {
  const account = await Account.find({ user: id }).select("-__v");
  return success(200, account);
};

const readAccountByName = async (userId, accountName) => {
  const account = await Account.find({
    user: userId,
    accountName: accountName
  }).select("-__v");
  return success(200, account);
};

const createAccount = async body => {
  const { error } = accountValidator(body);
  if (error) return failed(400, error.details[0].message);
  let account = await Account.findOne({
    user: body.user,
    accountName: body.accountName
  });
  body.openingBalance=0
  body.closingBalance = body.openingBalance;
  if (account) return failed(422, "Account already exist");
  accountObject = new Account(body);
  accountObject.closingBalanceHistory.push({
    date: "06-10-2019",
    balance: body.openingBalance
  });
  account=await accountObject.save();
  return success(201, account);
};

module.exports = {
  createAccount,
  readAccount,
  readAccountById,
  readAccountByUser,
  readAccountByName
};
