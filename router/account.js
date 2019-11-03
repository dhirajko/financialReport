const express = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createAccount,
  readAccountById,
  readAccountByName,
  readAccountByUser,
  readAccount
} = require("../controller/account");

router.get("/", auth, async (req, res) => {
  if (req.query.accountName) {
    const account = await readAccountByName(req.user.id, req.query.accountName);
    return res.status(200).send(account);
  } else if (req.query.user) {
    if (!req.user.isAdmin) {
      return res.status(400).send({
        status_code: 400,
        message: "FAILED",
        data: "Unauthorized user"
      });
    }
    const { error } = Joi.validate(req.query.user, Joi.objectId());
    if (error)
      return res.status(400).send({
        status_code: 400,
        message: "FAILED",
        data: error.details[0].message
      });
    const account = await readAccountByUser(req.query.user);
    return res.status(account.status_code).send(account);
  }
  const account = await readAccountByUser(req.user.id);
  return res.status(account.status_code).send(account);
});

router.get("/:id", auth, async (req, res) => {
  const account = await readAccountById(req.params.id);
  return res.status(account.status_code).send(account);
});

router.post("/", auth, async (req, res) => {
  req.body.user = req.user.id;
  const account = await createAccount(req.body);
  return res.status(account.status_code).send(account);
});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});
module.exports = router;
