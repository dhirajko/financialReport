const experss = require("express");
const router = experss.Router();
const _ = require('lodash')
const auth = require("../middleware/auth");
const { Transaction, transactionSchema, transactionValidator } = require('../model/transaction')
const { LedgerAccount } = require('../model/ledger')

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

    let debitAccount = await LedgerAccount.findOne({ "user._id": user.id, "accountName": req.body.debitAccount })
    if (!debitAccount) return res.status(404).send('No given debit account found')
    let creditAccount = await LedgerAccount.findOne({ "user._id": user.id, "accountName": req.body.creditAccount })
    if (!creditAccount) return res.status(404).send('No given debit account found')

    if (req.body.amount < debitAccount.closingBalance || req.body.amount < creditAccount.closingBalance)
        return res.status(412).send('Insufficient balance')

    let newDebitBalance, newCreditBalance;
    if (debitList.includes(debitAccount.trim().toLowerCase())) {
        newDebitBalance = debitAccount.closingBalance + req.body.amount
    }
    else {
        newDebitBalance = debitAccount.closingBalance - req.body.amount
    }
    if (debitList.includes(creditAccount.trim().toLowerCase())) {
        newCreditBalance = creditAccount.closingBalance - req.body.amount
    } else {
        newCreditBalance = creditAccount.closingBalance + req.body.amount
    }

    Promise.all([
        createTransaction(req.body),
        updateAccount(req.body,req.body.debitAccount,createTransaction(req.body),debitAccount.closingBalance,newDebitBalance),
        updateAccount(req.body,req.body.creditAccount,createTransaction(req.body),creditAccount.closingBalance,newCreditBalance)

    ]).then((result=>{
        console.log(result);
        
    }))
    res.send('transaction created')
})

async function createTransaction(data) {
    const transaction= await Transaction.create(data)
    return transaction;
}

async function updateAccount(data, account, transaction, closingBalance, newClosingBalance) {
    data.closingBalanceHistory.push({
        date: Date.now(),
        balance: closingBalance
    })
    const payload = {
        particular: data.particular.push(transaction),
        closingBalanceHistory: data.closingBalanceHistory,
        closingBalance: newClosingBalance
    }

    await LedgerAccount.findOneAndUpdate(
        { "user._id": user.id, accountName: account },
        { $set: payload },
        { new: true }
    );
}






module.exports = router;
