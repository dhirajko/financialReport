const experss = require("express");
const router = experss.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { validateUser, User } = require("../model/user");
const auth=require('../middleware/auth')
const moment=require('moment')

router.get("/", async(req, res) => {
  
  
  console.log(parseInt(Date.now())+900000+" : "+Date.now());
  
  const users = await User.find({}).select(["-password"]);
  const payload = users.map(user => {
    //return _.pick(user, ['_id', 'username','isActive']);
    return user;
  });
  res.send(payload);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select([
    "_id",
    "username",
    "isActive"
  ]);
  if (!user)
    return res.status(404).send(" The customer with given id is not found");

  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(409).send("username already registered");

  const payloadForDataBase = _.pick(req.body, ["username", "password"]);
  user = new User(payloadForDataBase);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.isAdmin = false;
  user.isStaff = false;
  user.isActive = false;

  await user.save();
  const token = user.generateAuthToken();
  res
    .status(201)
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "username", "isActive"]));
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).send(" The customer with given id is not found");
  console.log(user);

  const responseData = _.pick(user, ["username"]);
  res.send(responseData);
});

module.exports = router;
