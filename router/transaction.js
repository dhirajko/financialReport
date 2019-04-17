const experss = require("express");
const router = experss.Router();
const _ = require('lodash')
const auth = require("../middleware/auth");
const { Transaction, transactionSchema, transactionValidator } = require('../model/transaction')
const { Account } = require('../model/accounts')

const sampleUser = {
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

router.get('/:account', async (req, res) => {
    const account = await Account.findOne({ "user": sampleUser.id, accountName: req.params.account })
        .populate('particular')
    res.status(200).send(account.particular)
})

router.post('/', async (req, res) => {
    const { error } = transactionValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let debitAccount = await Account.findOne({ accountName: req.body.debitAccount, "user": sampleUser.id })
    if (!debitAccount) return res.status(404).send('Given debit account not found')
    let creditAccount = await Account.findOne({ accountName: req.body.creditAccount, "user": sampleUser.id })
    if (!creditAccount) return res.status(404).send('No given debit account found')
    let newDebitBalance, newCreditBalance;
    if (debitList.includes(debitAccount.tag.trim().toLowerCase())) {
        newDebitBalance = debitAccount.closingBalance + req.body.amount
    }
    else {
        if (req.body.amount > debitAccount.closingBalance)
            return res.status(412).send(`Insufficient ${debitAccount.accountName} account balance`)
        newDebitBalance = debitAccount.closingBalance - req.body.amount
    }
    if (debitList.includes(creditAccount.tag.trim().toLowerCase())) {
        if (req.body.amount > creditAccount.closingBalance)
            return res.status(412).send(`Insufficient ${creditAccount.accountName} account balance`)
        newCreditBalance = creditAccount.closingBalance - req.body.amount
    }
    else {
        newCreditBalance = creditAccount.closingBalance + req.body.amount
    }
    const transactionPayload = {
        ...req.body,
        user: sampleUser.id
    }
    const transaction = new Transaction(transactionPayload)
    transaction.save()
    updateAccount(debitAccount, newDebitBalance, transaction)
    updateAccount(creditAccount, newCreditBalance, transaction)
    res.status(201).send(transaction)
})

router.delete('/:id', async (req, res) => {
    const transaction = await Transaction.findByIdAndRemove(req.params.id)
    if (!transaction) return res.status(404).send('Transaction not found')
    res.status(200).send(transaction)
})


async function updateAccount(account, newClosingBalance, transaction) {
    let alltransactions = account.particular;
    alltransactions.push(transaction.id)
    let closingBalanceHistory = account.closingBalanceHistory;
    closingBalanceHistory.push({ date: new Date(), balance: newClosingBalance })
    const payload = {
        particular: alltransactions,
        closingBalanceHistory: closingBalanceHistory,
        closingBalance: newClosingBalance
    }
    await Account.findOneAndUpdate(
        { accountName: account.accountName, "user": sampleUser.id },
        { $set: payload },
        { new: true }
    );
}
module.exports = router;
