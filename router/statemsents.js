const experss = require("express");
const router = experss.Router();
const { allTags, allAssets, liabilityAndCapital, fixedAssets, currentAssets, capital, liability, income, expesnse } = require('../utility/listOfTags')
const { Account } = require('../model/accounts')
const { User } = require('../model/user')
const profitCalculation = require('../utility/porfitCalculation')

const sampleUser = {

    "id": "5cba45c6a81396001723d4d1",
    "username": "dhirajko",
    "isAdmin": false,
    "isStaff": false,
    "isActive": false,

}

router.get('/balancesheet', async (req, res) => {
    const user = await User.findById(sampleUser.id)
        .populate('accounts')
        .select('-password')
    const profit = await profitCalculation(sampleUser.id)
    res.send('done')
})

module.exports = router;