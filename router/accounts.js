const experss = require("express");
const router = experss.Router();
const _ = require('lodash')
const auth = require("../middleware/auth");
const { accountSchemavalidator, Account } = require('../model/accounts')
const { User } = require('../model/user')



router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate('accounts')
    res.send(user.accounts)

})

router.get('/:name', auth, async (req, res) => {
    const account = await Account.findOne({ "user": req.user.id, accountName: req.params.name })
    if (!account)
    return res.status(404).send("Account not found ");
    res.status(200).send(account)
})

router.post("/", auth, async (req, res) => {
    const { error } = accountSchemavalidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let account = await Account.findOne({ accountName: req.body.accountName, "user": req.user.id })
    if (account) return res.status(409).send('you alread have this account')

    const payload = {
        ...req.body,
        closingBalanceHistory: {
            date: new Date(),
            balance: req.body.openingBalance
        },
        user: req.user.id,
        closingBalance: req.body.openingBalance
    };
    account = new Account(payload);
    const user = await User.findById(req.user.id)
    const userAccounts = user.accounts;
    userAccounts.push(account.id)
    await account.save();
    await user.save()
    res.status(201).send(account);
});


router.delete("/:name", auth, async (req, res) => {
    const account = await Account.findOne({ "user": req.user.id, accountName: req.params.name })
    if (!account)
        return res.status(404).send("Account not found ");
    if (account.particular.length > 0) {
        return res.status(405).send("please delete all the transaction of this account  first")
    }
    const user = await User.findById(req.user.id)
        .populate({
            path: 'accounts'
        })
    const index = user.accounts.map(account => account.accountName).indexOf(req.params.name);
    user.accounts.splice(index, 1)
    user.save()
    await account.remove()
    res.send(account)
});


module.exports = router;