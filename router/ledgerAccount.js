const experss = require("express");
const router = experss.Router();
const _ = require('lodash')
const auth = require("../middleware/auth");
const { accountSchemavalidatorForEdit, accountSchemavalidator, LedgerAccount } = require('../model/ledger')

const user = {
    id: "5cb05e34a6e0d30986127035",
    username: "dhirajko",
    password: "$2a$10$HnKce7vcJt5N44yIfBHwO.GAIG8QrJYd7.L3HBeS8rdvjuvtN.4zm",
    isAdmin: true,
    isStaff: true,
    isActive: true,
}

router.get('/', async (req, res) => {
    const accounts = await LedgerAccount.find({ 'user._id': user.id })
    res.status(200).send(accounts)
})

router.get('/:name', async (req, res) => {
    const account = await LedgerAccount.find({ "user._id": user.id, "accountName": req.params.name })
    res.status(200).send(account)
})

router.post("/", async (req, res) => {
    const { error } = accountSchemavalidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let account = await LedgerAccount.findOne({ "user._id": user.id, "accountName": req.body.accountName })
    console.log(account);
    if (account) return res.status(409).send('you alread have this account')

    const payload = {
        ...req.body,
        user: {
            _id: user.id,
            username: user.username
        }
    };
    account = new LedgerAccount(payload);
    await account.save();
    res.status(201).send(account);
});

router.put("/:name", async (req, res) => {
    const { error } = accountSchemavalidatorForEdit(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body.user);

    const account = await LedgerAccount.findOneAndUpdate(
        { "user._id": user.id, "accountName": req.params.name },
        { $set: req.body },
        { new: true }
    );
    console.log(account);
    if (!account) return res.status(404).send('Account is not found')
    res.status(200).send(account);
});

router.delete("/:name",  async (req, res) => {
    const account = await LedgerAccount.findOneAndRemove({ "user._id": user.id, "accountName": req.params.name });
    if (!account)
        return res.status(404).send("Account not found ");
    res.status(200).send(account);
});


module.exports = router;