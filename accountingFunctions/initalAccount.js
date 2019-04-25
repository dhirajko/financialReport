const { Account } = require('../model/accounts')
module.exports = async (user) => {
    const profitAccountPayload = {
        "user": user.id,
        "accountName": "profit and loss account",
        "alias": "",
        "tag": "profit",
        "inventoryAffects": false,
        "descreption": "Profit ",
        "openingBalance": 0,
        "closingBalance": 0
    }
    const capitalAccountPayload = {
        "user": user.id,
        "accountName": "capital account",
        "alias": "",
        "tag": "capital account",
        "inventoryAffects": false,
        "descreption": "capital Account ",
        "openingBalance": 0,
        "closingBalance": 0
    }
    const AccumulatedProfitAccountPayload = {
        "user": user.id,
        "accountName": "accumulated profit",
        "alias": "",
        "tag": "capital account",
        "inventoryAffects": false,
        "descreption": `accumulated profit from ${new Date}`,
        "openingBalance": 0,
        "closingBalance": 0
    }
    const capitalAccount = await Account.create(capitalAccountPayload)
    const profitLossAccount = await Account.create(profitAccountPayload)
    const accumulatedProfitAccount = await Account.create(AccumulatedProfitAccountPayload)
    accounts = user.accounts
    accounts.push(profitLossAccount.id)
    accounts.push(capitalAccount)
    accounts.push(accumulatedProfitAccount)
    console.log(user); 
    const userData= await user.save();   
    return userData
}