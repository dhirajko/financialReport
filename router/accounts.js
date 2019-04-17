const experss = require("express");
const router = experss.Router();
const _ = require('lodash')
const auth = require("../middleware/auth");
const { accountSchemavalidatorForEdit, accountSchemavalidator, Account } = require('../model/accounts')
const { User } = require('../model/user')

const sampleUser = {
    id: "5cb05e34a6e0d30986127035",
    username: "dhirajko",
    password: "$2a$10$HnKce7vcJt5N44yIfBHwO.GAIG8QrJYd7.L3HBeS8rdvjuvtN.4zm",
    isAdmin: true,
    isStaff: true,
    isActive: true,

}

router.get('/', async (req, res) => {
    const user = await User.findById(sampleUser.id)
        .populate('accounts')
        res.send(user.accounts)

})

router.get('/:name', async (req, res) => {
    const account = await Account.findOne({ "user": sampleUser.id, accountName: req.params.name })
    res.status(200).send(account)
})

router.post("/", async (req, res) => {
    const { error } = accountSchemavalidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let account = await Account.findOne({ accountName: req.body.accountName, "user": sampleUser.id })
    if (account) return res.status(409).send('you alread have this account')

    const payload = {
        ...req.body,
        closingBalanceHistory: {
            date: new Date(),
            balance: req.body.openingBalance
        },
        user: sampleUser.id,
        closingBalance: req.body.openingBalance
    };
    account = new Account(payload);
    const user = await User.findById(sampleUser.id)
    const userAccounts = user.accounts;
    userAccounts.push(account.id)
    console.log(account);
    console.log(userAccounts);
    await account.save();
    await user.save()
    res.status(201).send(account);
});



router.delete("/:name", async (req, res) => {
    const user = await User.findById(sampleUser.id)
        .populate({
            path: 'accounts'
        })    
    const index = user.accounts.map(account => account.accountName).indexOf(req.params.name);
    user.accounts.splice(index, 1)
    user.save()
    const account = await Account.findOneAndRemove({ "user": sampleUser.id, "accountName": req.params.name });  
    if (!account)
        return res.status(404).send("Account not found ");
    res.send(account)
});


module.exports = router;