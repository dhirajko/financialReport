const { Account } = require('../model/accounts')
module.exports = async (user,accountName,tag,alias,descreption,openingBalance,closingBalance,inventoryAffects) => {
    
    const payload = {
        "user": user._id,
        "accountName": accountName,
        "alias": alias,
        "tag": tag,
        "inventoryAffects": inventoryAffects,
        "descreption": descreption,
        "openingBalance": openingBalance,
        "closingBalance": closingBalance
    }
    
    const account = new Account(payload)
    account.closingBalanceHistory.push({
        date: new Date(),
        balance : account.openingBalance
    })
    accounts = user.accounts   
    accounts.push(account.id)  
    const userData= await account.save()   
    await user.save();   
    return userData
}