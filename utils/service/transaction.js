const { creditList, debitList } = require("../../const/listOfTags");


const {Account}= require("../../model/accounts")

const debitBalanceValidate = (accountId, amount) => {
    const account = await Account.findOne({_id: id})
    if(!account) return {result : false, note : "account not found" }

    if(creditList.includes(account.tag)){
       if(account.closingBalance<amount){
           return {result : false, note : "insufficient balance" }
       }
    }
    return {result : true, note : "sufficient balance" }
};

const creditBalanceValidate = (accountId, amount) => {
    const account = await Account.findOne({_id: id})
    if(!account) return {result : false, note : "account not found" }

    if(debitList.includes(account.tag)){
       if(account.closingBalance<amount){
           return {result : false, note : "insufficient balance" }
       }
    }
    return {result : true, note : "sufficient balance" }
};

module.exports={debitBalanceValidate,creditBalanceValidate}