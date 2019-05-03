const { income, expenses } = require('../utils/listOfTags')
const { User } = require('../model/user')
const { Account } = require('../model/accounts')
const { Transaction } = require('../model/transaction')


module.exports = async (userId) => {
    const user = await User.findById(userId)
        .populate('accounts')
        .select('-password')
    let allExpenses = 0;
    let allIncome = 0;
    user.accounts.map(account => {
        if (income.includes(account.tag)) {
            allIncome = allIncome + account.closingBalance
        }
        if (expenses.includes(account.tag)) {
            allExpenses = allExpenses + account.closingBalance
        }
    })
    const profit = allIncome - allExpenses
    if (!(profit == 0)) {
        console.log(profit);

        transactionPayload = {
            user: userId,
            date: new Date(),
            debitAccount: "profit and loss account",
            creditAccount: "accumulated profit and loss account",
            amount: profit,
            descreption: `profit and loss calculated on ${new Date()}`
        }

        const transaction = new Transaction(transactionPayload)
        const profitAndLossAccount = await Account.findOne({ user: userId, accountName: transactionPayload.debitAccount })
        const accumulatedProfit = await Account.findOne({ user: userId, accountName: transactionPayload.creditAccount })
        
        
        profitAndLossNewBalance = profitAndLossAccount.closingBalance + profit
        profitAndLossAccount.particular.push(transaction.id)
        profitAndLossAccount.closingBalance= profitAndLossNewBalance
        profitAndLossAccount.closingBalanceHistory.push({ date: new Date(), balance: profitAndLossNewBalance })        
        
        accumulatedProfitNewBalance = accumulatedProfit.closingBalance + profit
        accumulatedProfit.particular.push(transaction.id)
        accumulatedProfit.closingBalance= profitAndLossNewBalance
        accumulatedProfit.closingBalanceHistory.push({ date: new Date(), balance: profitAndLossNewBalance })
        
        await transaction.save()
        await profitAndLossAccount.save()
        await accumulatedProfit.save()

        if(profitAndLossAccount.closingBalance<0){
            return{status : "loss", amount: profitAndLossAccount.closingBalance}
        }
        return {status : "profit", amount: profitAndLossAccount.closingBalance}
    }
    const profitAndLossAccount = await Account.findOne({ user: userId, accountName: "profit and loss account" })
    if(profitAndLossAccount.closingBalance<0){
        return{status : "loss", amount: profitAndLossAccount.closingBalance}
    }
    return {status : "profit", amount: profitAndLossAccount.closingBalance}
}
