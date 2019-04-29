const experss = require("express");
const router = experss.Router();
const apidoc=require('../controller/apidocs')
const auth= require('../middleware/auth')

router.get('/',auth, async (req, res) => {     
    const documents = apidoc()
    res.status(200).send(documents)
})

module.exports = router;