
const { Account } = require('../model/accounts')
const { Transaction } = require('../model/transaction')
const { allAssets, expesnse } = require('./listOfTags')
const _ = require('lodash')


const debitList = _.concat(allAssets, expesnse)
module.exports = async ( userId, transactionRequestPayload) => {

    const transactionPayload = {
        ...transactionRequestPayload,
        user: userId
    }
   

    let debitAccount = await Account.findOne({ accountName: transactionPayload.debitAccount, "user": userId })
    if (!debitAccount) return {code :  404, message :'No given debit account found'}

    let creditAccount = await Account.findOne({ accountName: transactionPayload.creditAccount, "user": userId })
    if (!creditAccount) return {code :  404, message :'No given credit account found'}




    let newDebitBalance, newCreditBalance;
    if (debitList.includes(debitAccount.tag.trim().toLowerCase())) {
        newDebitBalance = debitAccount.closingBalance + transactionPayload.amount

    }
    else {


        if (transactionRequestPayload.amount > debitAccount.closingBalance) {
            return {code :  412, message :"Insufficient debit account balance"}
        }
        newDebitBalance = debitAccount.closingBalance - transactionRequestPayload.amount
    }



    if (debitList.includes(creditAccount.tag.trim().toLowerCase())) {
        if (transactionPayload.amount > creditAccount.closingBalance) {
            console.log(creditAccount.tag);
            return {code :  412, message :"Insufficient credit account balance"}
        }

        newCreditBalance = creditAccount.closingBalance - transactionPayload.amount
    }
    else {
        newCreditBalance = creditAccount.closingBalance + transactionPayload.amount
    }
    console.log(newCreditBalance);
    const transaction = new Transaction(transactionPayload)
    await transaction.save()
    await updateAccount(debitAccount, newDebitBalance, transaction, userId)
    await updateAccount(creditAccount, newCreditBalance, transaction, userId)
    console.log(transaction);    
    return {code :  412, message :transaction}

}

async function updateAccount(account, newClosingBalance, transaction, userId) {
    let alltransactions = account.particular;
    alltransactions.push(transaction.id)
    let closingBalanceHistory = account.closingBalanceHistory;
    closingBalanceHistory.push({ date: new Date(), balance: newClosingBalance })
    const payload = {
        particular: alltransactions,
        closingBalanceHistory: closingBalanceHistory,
        closingBalance: newClosingBalance
    }
    await Account.findOneAndUpdate(
        { accountName: account.accountName, "user": userId },
        { $set: payload },
        { new: true }
    );
}