const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {
  createTransaction,
  readTransactions,
  readTransactionsByAccountId,
  readTransactionsById
} = require("../controller/transaction");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  if (req.query.accountId) {
    const { error } = Joi.validate(req.query.accountId, Joi.objectId());
    if (error)
      return res.status(400).send({
        status_code: 400,
        message: "FAILED",
        data: error.details[0].message
      });
    const transaction = await readTransactionsByAccountId(req.user.id,req.query.accountId);
    return res.status(transaction.status_code).send(transaction);
  }
  const transactions = await readTransactions(req.user.id);
  return res.status(transactions.status_code).send(transactions);
});

router.get("/:id", auth, async (req, res) => {
  const transaction = await readTransactionsById(req.params.id);
  return res.status(transaction.status_code).send(transaction);
});

router.post("/", auth, async (req, res) => {
  req.body.user = req.user.id;
  const transaction = await createTransaction(req.body);
  return res.status(transaction.status_code).send(transaction);
});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});
module.exports = router;
