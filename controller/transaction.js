const { Transaction } = require("../model/transaction");
const { failed, success } = require("../const/response");
const { transactionValidator } = require("../utils/validator/transaction");
const { debitList, creditList } = require("../const/listOfTags");
const { Account } = require("../model/accounts");
const { createAccount, readAccountByName } = require("../controller/account");

const readTransactions = async userId => {
  const transactions = await Transaction.find({ user: userId }).populate([
    { path: "debitAccount", select: " accountName " },
    { path: "creditAccount", select: "accountName" }
  ]);
  return success(200, transactions);
};

const readTransactionsById = async id => {
  const transaction = await Transaction.findOne({ _id: id }).populate([
    { path: "debitAccount", select: " accountName " },
    { path: "creditAccount", select: "accountName" }
  ]);
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
    updatedDebitAccountBalance =
      Number(debitAccount.closingBalance) - Number(body.amount);
  } else {
    updatedDebitAccountBalance =
      Number(debitAccount.closingBalance) + Number(body.amount);
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
    if (Number(creditAccount.closingBalance) < Number(body.amount)) {
      return failed(412, "insufficient balance");
    }
    updatedCreditAccountBalance =
      Number(creditAccount.closingBalance) - Number(body.amount);
  } else {
    updatedCreditAccountBalance =
      Number(creditAccount.closingBalance) + Number(body.amount);
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

const combineTransaction = async body => {
  let debitAccount = await Account.findOne({
    user: body.user,
    accountName: body.debitAccountName
  });
  if (!debitAccount) {
    createdebitAccount = await createAccount({
      user: body.user,
      accountName: body.debitAccountName,
      alias: body.debitAccountName,
      tag: body.debitTag,
      descreption: body.debitAccountName + " Account",
      inventoryAffects: body.debitInventoryAffects
    });

    debitAccount = createdebitAccount.data;
  }
  let creditAccount = await Account.findOne({
    user: body.user,
    accountName: body.creditAccountName
  });
  if (!creditAccount) {
    createCreditAccount = await createAccount({
      user: body.user,
      accountName: body.creditAccountName,
      alias: body.creditAccountName,
      tag: body.creditTag,
      descreption: body.creditAccountName + " Account",
      inventoryAffects: body.creditInventoryAffects
    });

    creditAccount = createCreditAccount.data;
  }

  let transaction = await createTransaction({
    date: new Date(),
    debitAccount: debitAccount.id,
    creditAccount: creditAccount.id,
    amount: body.amount,
    descreption: body.descreption,
    user: body.user
  });

  return transaction;
};

module.exports = {
  readTransactions,
  readTransactionsByAccountId,
  readTransactionsById,
  createTransaction,
  combineTransaction
};
