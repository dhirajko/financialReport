const { Transaction } = require("../model/transaction");
const { failed, success } = require("../const/response");
const { transactionValidator } = require("../utils/validator/transaction");
const { debitList, creditList } = require("../const/listOfTags");
const { Account } = require("../model/accounts");
const mongoose = require("mongoose");

const readTransactions = async (userId) => {
  const transactions = await Transaction.find({user : userId}).populate(
    "debitAccount creditAccount"
  );
  return success(200, transactions);
};

const readTransactionsById = async id => {
  const transaction = await Transaction.findOne({ _id: id }).populate(
    "debitAccount creditAccount"
  );
  return success(200, transaction);
};

const readTransactionsByAccountId = async (userId, id) => {
  const transactions = await Transaction.find({
    user: userId,
    $and: [{ $or: [{ debitAccount: id }, { creditAccount: id }] }]
  });
  return success(200, transactions);
};

const createTransaction = async body => {
  const { error } = transactionValidator(body);
  if (error) return failed(400, error.details[0].message);

  let updatedDebitAccountBalance, updatedCreditAccountBalance;
  const debitAccount = await Account.findOne({
    user: body.user,
    _id: body.debitAccount
  });
  if (!debitAccount) return failed(404, "debit account not found");
  if (!debitList.includes(debitAccount.tag)) {
    if (debitAccount.closingBalance < body.amount) {
      return failed(412, "insufficient balance");
    }
    updatedDebitAccountBalance = debitAccount.closingBalance - body.amount;
  } else {
    updatedDebitAccountBalance = debitAccount.closingBalance + body.amount;
  }
  debitAccount.closingBalance = updatedDebitAccountBalance;
  debitAccount.closingBalanceHistory.push({
    date: body.date,
    balance: updatedDebitAccountBalance
  });

  const creditAccount = await Account.findOne({
    _id: body.creditAccount,
    user: body.user
  });
  if (!creditAccount) return failed(404, "credit account not found");
  if (!creditList.includes(creditAccount.tag)) {
    if (creditAccount.closingBalance < body.amount) {
      return failed(412, "insufficient balance");
    }
    updatedCreditAccountBalance = creditAccount.closingBalance - body.amount;
  } else {
    updatedCreditAccountBalance = creditAccount.closingBalance + body.amount;
  }

  creditAccount.closingBalance = updatedCreditAccountBalance;
  creditAccount.closingBalanceHistory.push({
    date: body.date,
    balance: updatedCreditAccountBalance
  });

  await debitAccount.save();
  await creditAccount.save();
  const transaction = await Transaction.create(body);
  return success(201, transaction);
};

module.exports = {
  readTransactions,
  readTransactionsByAccountId,
  readTransactionsById,
  createTransaction
};
