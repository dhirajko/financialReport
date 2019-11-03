const { Transaction } = require("../model/transaction");
const { failed, success } = require("../const/response");
const { transactionValidator } = require("../utils/validator/transaction");
const {
  debitList,
  creditList,
  currentAssets,
  fixedAssets,
  liability,
  capital,
  income,
  expenses
} = require("../const/listOfTags");
const { Account } = require("../model/accounts");

const trialBalance = async userId => {
  let debitSide = [],
    creditSide = [],
    debitTotal = 0,
    creditTotal = 0;
  let accounts = await Account.find({ user: userId });
  accounts.map(account => {
    if (creditList.includes(account.tag)) {
      creditSide.push({
        id: account.id,
        accountName: account.accountName,
        tag: account.tag,
        closingBalance: account.closingBalance
      });
      debitTotal = debitTotal + account.closingBalance;
    } else if (debitList.includes(account.tag)) {
      debitSide.push({
        id: account.id,
        accountName: account.accountName,
        tag: account.tag,
        closingBalance: account.closingBalance
      });
      creditTotal = creditTotal + account.closingBalance;
    }
  });
  console.log();
  
  return success(200, {
    debit: debitSide,
    credit: creditSide,
    debitTotal: debitTotal,
    creditTotal: creditTotal
  });
};

const profitAndLoss = async userId => {
  const { data } = await trialBalance(userId);
  let debitSide = [],
    creditSide = [],
    debitTotal = 0,
    creditTotal = 0,
    status = "",
    difference = "";
  data.debit.map(account => {
    if (expenses.includes(account.tag)) {
      debitSide.push({
        id: account.id,
        accountName: account.accountName,
        tag: account.tag,
        closingBalance: account.closingBalance
      });
      debitTotal = debitTotal + account.closingBalance;
    }
  });
  data.credit.map(account => {
    if (income.includes(account.tag)) {
      creditSide.push({
        id: account.id,
        accountName: account.accountName,
        tag: account.tag,
        closingBalance: account.closingBalance
      });
      creditTotal = creditTotal + account.closingBalance;
    }
    if (creditTotal > debitTotal) {
      status = "PROFIT";
    } else {
      status = "LOSS";
    }
    difference = creditTotal - debitTotal;
  });
  return success(200, {
    status: status,
    amount: difference,
    expenses: debitSide,
    incomes: creditSide,
    debitTotal: debitTotal,
    creditTotal: creditTotal
  });
};

const balanceSheet = async userId => {
  const { data } = await trialBalance(userId);
  const PL=await profitAndLoss(userId) 
  let cap = [],
    lia = [],
    CA = [],
    FA = [],
    capTotal = 0,
    liaTotal = 0,
    CATotal = 0,
    FATotal = 0;
  data.debit.map(account => {
    if (currentAssets.includes(account.tag)) {
      CA.push({
        id: account.id,
        accountName: account.accountName,
        tag: account.tag,
        closingBalance: account.closingBalance
      });
      CATotal = CATotal + account.closingBalance;
    } else if (fixedAssets.includes(account.tag)) {
      FA.push({
        id: account.id,
        accountName: account.accountName,
        tag: account.tag,
        closingBalance: account.closingBalance
      });
      FATotal = FATotal + account.closingBalance;
    }
  });

  data.credit.map(account => {
    if (capital.includes(account.tag)) {
      cap.push({
        id: account.id,
        accountName: account.accountName,
        tag: account.tag,
        closingBalance: account.closingBalance
      });
      capTotal = capTotal + account.closingBalance;
    }
    else if (liability.includes(account.tag)) {
      lia.push({
        id: account.id,
        accountName: account.accountName,
        tag: account.tag,
        closingBalance: account.closingBalance
      });
      liaTotal = liaTotal + account.closingBalance;
    }     
  });

  return success(200, {
   currentAssets: CA,
   fixedAssets : FA,
   capital: cap,
   liability: lia,
   capitalTotal: capTotal ,
    liabilityTotal : liaTotal,
    currentAssetsTotal: CATotal ,
    fixedAssetsTotal: FATotal,
    pl: {
      status : PL.data.status,
      amount : PL.data.amount
    }
  });
};

module.exports = { trialBalance, profitAndLoss, balanceSheet};
