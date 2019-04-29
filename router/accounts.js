const experss = require("express");
const router = experss.Router();
const _ = require('lodash')
const auth = require("../middleware/auth");
const { accountSchemavalidator, Account } = require('../model/accounts')
const { User } = require('../model/user')
const accountCreator = require('../controller/accountCreator')



router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate('accounts')
    if (!user)
        return res.status(404).send("User not found ");
    res.send(user.accounts)

})

router.get('/:id', auth, async (req, res) => {
    const account = await Account.findOne({ "user": req.user.id, _id: req.params.id, })
    if (!account)
        return res.status(404).send("Account not found ");
    res.status(200).send(account)
})

router.post("/", auth, async (req, res) => {
    const { error } = accountSchemavalidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let account = await Account.findOne({ accountName: req.body.accountName, "user": req.user.id })
    if (account) return res.status(409).send('you alread have this account')

    const user = await User.findById(req.user.id)

    account =await accountCreator(
        user,
        req.body.accountName,
        req.body.tag,
        req.body.alias,
        req.body.descreption,
        req.body.openingBalance,
        req.body.openingBalance,
        req.body.inventoryAffects
    )
    res.status(201).send(account);
});


router.delete("/:id", auth, async (req, res) => {
    const account = await Account.findOne({ "user": req.user.id, _id: req.params.id })
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