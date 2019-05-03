const experss = require("express");
const router = experss.Router();
const trialBalanceCreator = require('../controller/debitCreditDivider')
const auth= require('../middleware/auth')

router.get('/',auth, async (req, res) => {     
    const trialBalance = await trialBalanceCreator(req.user.id)
    res.status(200).send(trialBalance)
    
})

module.exports = router;