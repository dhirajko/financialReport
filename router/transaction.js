const experss = require("express");
const router = experss.Router();
const _ = require('lodash')
const auth = require("../middleware/auth");
const { Transaction, transactionValidator } = require('../model/transaction')
const transctionCreation = require('../accountingFunctions/nominalTransaction')

const { Account } = require('../model/accounts')


router.get('/', auth, async (req, res) => {
    const transactions = await Transaction.find({ "user": req.user.id })
        .select('-user')
    if (!transactions)
        return res.status(404).send("Transactions not found")
    res.status(200).send(transactions)
})

router.get('/:account', auth, async (req, res) => {
    const account = await Account.findOne({ "user": req.user.id, accountName: req.params.account })
        .populate('particular', '-user')
    if (!account)
        return res.status(404).send("Account not found")
    res.status(200).send(account.particular)
})

router.post('/', auth, async (req, res) => {
    const { error } = transactionValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const newTransaction = await transctionCreation(req.user.id, req.body)
    res.status(newTransaction.code).send(newTransaction.message)
})

router.delete('/:id', auth, async (req, res) => {
    const transaction = await Transaction.findById(req.params.id)
    if (!transaction) return res.status(404).send('Transaction not found')
    const debitAccount = await Account.findOne({ "user": req.user.id, accountName: transaction.debitAccount })
        .populate('particular')
    const debitAccountIndex = debitAccount.particular.map(event => event.id).indexOf(req.params.id);
    debitAccount.particular.splice(debitAccountIndex, 1)
    const creditAccount = await Account.findOne({ "user": req.user.id, accountName: transaction.creditAccount })
        .populate('particular')
    const creditAccountIndex = creditAccount.particular.map(event => event.id).indexOf(req.params.id);
    creditAccount.particular.splice(creditAccountIndex, 1)
    await debitAccount.save()
    await creditAccount.save()
    const deletedData = await Transaction.findByIdAndRemove(req.params.id)
    res.status(200).send(deletedData)
})



module.exports = router;
