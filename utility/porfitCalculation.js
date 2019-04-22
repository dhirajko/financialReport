const { income, expesnse } = require('./listOfTags')
const { User } = require('../model/user')
const { Account } = require('../model/accounts')
const { Transaction } = require('../model/transaction')

module.exports = async (userId) => {
    const user = await User.findById(userId)
        .populate('accounts')
        .select('-password')
    let allIncome = 0;
    let allExpenses = 0;
    user.accounts.map(account => {
        if (income.includes(account.tag)) {
            allIncome = allIncome + account.closingBalance
        }
        if (expesnse.includes(account.tag)) {
            allExpenses = allExpenses + account.closingBalance
        }
    })
    const profit = allIncome - allExpenses

    if (!profit == 0) {
        console.log("profit ==0: ",profit);
        let profitLossAccount = await Account.findOne({ user: userId, accountName: "profit and loss account" })
        if (!profitLossAccount) {
            const profitPayload = {
                "user": userId,
                "accountName": "profit and loss account",
                "alias": "",
                "tag": "profit",
                "inventoryAffects": false,
                "descreption": "Profit ",
                "openingBalance": 0,
                "closingBalance": 0
            }
            
            profitLossAccount = await Account.create(profitPayload)
            accounts= user.accounts
            accounts.push(profitLossAccount.id)            
            await user.save()
        }
        let capitalAccount= await Account.findOne({user : userId, tag: "capital account"})
        if(!capitalAccount){
            const capitalAccountPayload = {
                "user": userId,
                "accountName": "capital account",
                "alias": "",
                "tag": "capital account",
                "inventoryAffects": false,
                "descreption": "capital Account ",
                "openingBalance": 0,
                "closingBalance": 0
            }
            capitalAccount= await Account.create(capitalAccountPayload)
            accounts=user.accounts
        }

        let transaction = {}
        if (profit > 0) {
            console.log("profit : ",profit);
            transaction = await Transaction.create({
                "user": userId,
                "date": (new Date()).toISOString(),
                "debitAccount": "profit and loss account",
                "creditAccount": "capital",
                "amount": profit,
                "descreption": "invested"
            })

        }
        if (profit < 0) {
            console.log("profit < 0: ",profit);
            transaction = await Transaction.create({
                "user": userId,
                "date": (new Date()).toISOString(),
                "debitAccount": "capital",
                "creditAccount": "profit and loss account",
                "amount": profit,
                "descreption": "invested"
            })

        }
       
    }
}