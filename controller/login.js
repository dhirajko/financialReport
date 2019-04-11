const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { User } = require("../model/user");

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password");

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "email", "isActive"]));
});

function validateAuth(req) {
  const schema = {
    email: Joi.string()
      .min(3)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(1024)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
