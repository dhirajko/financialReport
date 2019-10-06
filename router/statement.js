const express = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const router = express.Router();
const {
  trialBalance,
  profitAndLoss,
  balanceSheet
} = require("../controller/statements");
const auth = require("../middleware/auth");



router.get("/trialbalance", auth, async (req, res) => {
  const tb = await trialBalance(req.user.id);
  return res.status(tb.status_code).send(tb);
});

router.get("/placcount", auth, async (req, res) => {
  const PLAccount = await profitAndLoss(req.user.id);
  return res.status(PLAccount.status_code).send(PLAccount);
});

router.get("/balancesheet", auth, async (req, res) => {
  const bs = await balanceSheet(req.user.id);
  return res.status(bs.status_code).send(bs);
});
module.exports = router;
