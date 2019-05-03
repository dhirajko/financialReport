const { allAssets, liabilityAndCapital, income, expenses, allDebit, allCredit } = require('../utils/listOfTags')
const { User } = require('../model/user')
const { Account } = require('../model/accounts')
const accountCreator = require('./accountCreator')

const trialBalanceCalculator = async (userId) => {
    const user = await User.findById(userId)
        .populate('accounts')
        .select('-password')


    const { debitSide, creditSide } = debitCreditDivider(user.accounts)

    let debitSideBalance = 0;
    let creditSideBalance = 0;

    debitSide.map(account => { debitSideBalance = debitSideBalance + account.closingBalance });
    creditSide.map(account => { creditSideBalance = creditSideBalance + account.closingBalance })
    let suspenseAccount = await Account.findOne({ user: userId, accountName: 'suspense account' })


    if (debitSideBalance != creditSideBalance) {

        if (!suspenseAccount) {
            console.log(' no account found');
            suspenseAccount = await accountCreator(user, 'suspense account', 'current assets', 'suspense', 'unknown account', 0, 0, false)
        }

        if (debitSideBalance > creditSideBalance) {
            let trialBalanceDifference = debitSideBalance - creditSideBalance
            let differenceSurplus = trialBalanceDifference - suspenseAccount.closingBalance
            if (allDebit.includes(suspenseAccount.tag)) {
                if (differenceSurplus == 0) {
                    suspenseAccount.closingBalance = differenceSurplus
                    console.log('have to remove');
                }
                if (differenceSurplus > 0) {
                    suspenseAccount.closingBalance = differenceSurplus
                    suspenseAccount.tag = 'current liability'
                }
                if (differenceSurplus < 0) {
                    suspenseAccount.closingBalance = Math.abs(differenceSurplus)
                }
            }
            else {
                suspenseAccount.closingBalance = suspenseAccount.closingBalance + differenceSurplus

            }

        }

        else {

            let trialBalanceDifference = creditSideBalance - debitSideBalance
            let differenceSurplus = trialBalanceDifference - suspenseAccount.closingBalance
            if (allCredit.includes(suspenseAccount.tag)) {
                if (differenceSurplus == 0) {
                    suspenseAccount.closingBalance = differenceSurplus
                    console.log('Have to remove  from credit side');

                }
                if (differenceSurplus > 0) {
                    suspenseAccount.closingBalance = differenceSurplus
                    suspenseAccount.tag = 'current assets'
                }
                if (differenceSurplus < 0) {
                    suspenseAccount.closingBalance = Math.abs(differenceSurplus)
                }
            }
            else {
                suspenseAccount.closingBalance = suspenseAccount.closingBalance + differenceSurplus
            }
        }
        await suspenseAccount.save()
    }
  let updatedUser = await User.findById(userId)
    .populate('accounts')
    .select('-password')

    return debitCreditDivider(updatedUser.accounts)
}

const debitCreditDivider = (accounts) => {
    let debitSide = []
    let creditSide = []

    accounts.map(account => {
        if (expenses.includes(account.tag) || allAssets.includes(account.tag)) {
            debitSide.push(account)
        }
        if (liabilityAndCapital.includes(account.tag) || income.includes(account.tag)) {
            creditSide.push(account)
        }
    })
    return { debitSide, creditSide }
}


module.exports = trialBalanceCalculator