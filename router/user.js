const experss = require("express");
const router = experss.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { passWordValidator, validateUser, User } = require("../model/user");
const auth = require('../middleware/auth')
const playground = require('./playground')
const initalAccounts = require('../accountingFunctions/initalAccount')
const {Transaction} = require('../model/transaction')
const { Account }= require('../model/accounts')




router.get("/", auth, async (req, res) => {
  //playground();
  const user = await User.findById(req.user.id)
    .select('-password')
  if (!user) return res.status(404).send('user not found')
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
  const addingAccountingtoUser = await initalAccounts(user)
  const token = user.generateAuthToken();
  const payload = _.pick(addingAccountingtoUser, ["id", "username", "isActive"])
  payload.token = token
  res
    .status(201)
    // .header("x-auth-token", token)
    .send(payload);
});

router.put("/", auth, async (req, res) => {
  const { error } = passWordValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.user.username });
  if (!user) return res.status(404).send("user not found");

  const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!validPassword)
    return res.status(400).send("incorrect password");
  const salt = await bcrypt.genSalt(10)
  newHashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  user.password = newHashedPassword
  await user.save()
  res.status(200).send('password changed')
});

router.delete("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id)
  .populate("accounts")
  if (!user)
    return res.status(404).send(" The customer with given id is not found");
  await Transaction.deleteMany({ user : req.user.id })
  await Account.deleteMany({user : req.user.id})
  await user.remove()
  
  res.status(200).send('deleted successfully')
});
module.exports = router;
