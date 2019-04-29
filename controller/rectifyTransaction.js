const { Transaction } = require('../model/transaction')
const createTransaction=require('./nominalTransaction')
module.exports = async (userId,transactionId) => {
    let response={}
    const errorTransaction=await Transaction.findById(transactionId)
    if(!errorTransaction)
        return {status : 404, message : "transaction of given id not found"}
    const rectificationPayload={	
        "date": new Date(),
       "debitAccount": errorTransaction.creditAccount,
       "creditAccount": errorTransaction.debitAccount,
       "amount":errorTransaction.amount,
       "descreption": `rectification of transaction id ${transactionId}`,
   }
   return createTransaction(userId,rectificationPayload)
}