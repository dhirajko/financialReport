const experss = require("express");
const router = experss.Router();
const profitCalculation = require('../controller/porfitCalculation')
const auth= require('../middleware/auth')

router.get('/status',auth, async (req, res) => {     
    const profit = await profitCalculation(req.user.id)
    res.status(200).send(profit)
})

module.exports = router;