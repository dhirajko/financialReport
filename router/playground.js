const trialBalance=require('../controller/debitCreditDivider')

module.exports = async (userId) => {
return trialBalance(userId)
}