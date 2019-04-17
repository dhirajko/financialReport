const experss = require("express");
const router = experss.Router();
const _ = require('lodash')
const auth = require("../middleware/auth");
const { Transaction, transactionSchema, transactionValidator } = require('../model/transaction')
const {Account } = require('../model/accounts')

const user = {
    id: "5cb05e34a6e0d30986127035",
    username: "dhirajko",
    password: "$2a$10$HnKce7vcJt5N44yIfBHwO.GAIG8QrJYd7.L3HBeS8rdvjuvtN.4zm",
    isAdmin: true,
    isStaff: true,
    isActive: true,
}

const debitList = [
    'bank account',
    'cash in hand',
    'deposits (assets)',
    'direct expenses',
    'duties and tax',
    'fixed assets',
    'indirect expenses',
    'investment',
    'loan (assets)',
    'provisions',
    'stock in hand',
    'sundry debtors']

router.get('/', async (req, res) => {
    const transaction = await Transaction.find({ 'user._id': user.id })
    res.status(200).send(transaction)
})

router.post('/', async (req, res) => {
    const { error } = transactionValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let debitAccount = await Account.findOne({ "user._id": user.id, "accountName": req.body.debitAccount })
    if (!debitAccount) return res.status(404).send('No given debit account found')
    let creditAccount = await Account.findOne({ "user._id": user.id, "accountName": req.body.creditAccount })
    if (!creditAccount) return res.status(404).send('No given debit account found')

    let newDebitBalance, newCreditBalance;
    if (debitList.includes(debitAccount.tag.trim().toLowerCase())) {
        newDebitBalance = debitAccount.closingBalance + req.body.amount
    }
    else {
        if (req.body.amount > debitAccount.closingBalance)
            return res.status(412).send(`Insufficient ${debitAccount.accountName} balance`)
        newDebitBalance = debitAccount.closingBalance - req.body.amount
    }
    if (debitList.includes(creditAccount.tag.trim().toLowerCase())) {
        if (req.body.amount > creditAccount.closingBalance)
            return res.status(412).send(`Insufficient ${creditAccount.accountName} balance`)
        newCreditBalance = creditAccount.closingBalance - req.body.amount
    } else {
        newCreditBalance = creditAccount.closingBalance + req.body.amount
    }

    const transactionPayload = {
        ...req.body,
        user: {
            _id: user.id,
            username: user.username
        }
    }
    console.log(newDebitBalance);

    const transaction = new Transaction(transactionPayload)

    

    updateAccount(debitAccount, newDebitBalance,transaction)

    // Promise.all([
    //     transaction.save(),
    //     updateAccount(debitAccount, newDebitBalance,transaction),
    //     updateAccount(creditAccount, newCreditBalance,transaction)
    // ]).then((result => {
    //     console.log(result);

    // }))
    // .then(result=> res.send(result)) 
    // .catch(err=>res.send(err))
})



async function updateAccount(account, newClosingBalance, transaction) {

    const alltransactions = account.particular;
    alltransactions.push(transaction._id)
    const closingBalanceHistory = account.closingBalanceHistory;
    closingBalanceHistory.push({ Date: Date.now(), balance: account.closingBalance })

    const payload = {
        particular: alltransactions,
        closingBalanceHistory: closingBalanceHistory,
        closingBalance: newClosingBalance
    }

    console.log(payload);


    // await Account.findOneAndUpdate(
    //     { "user._id": user.id, accountName: account.accountName },
    //     { $set: payload },
    //     { new: true }
    // );
}






module.exports = router;
