const experss = require("express");
const router = experss.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { passWordValidator, validateUser, User } = require("../model/user");
const auth = require('../middleware/auth')
const playground = require('./playground')




router.get("/", auth, async (req, res) => {
  //playground();
  const user = await User.findById(req.user.id)
  .select('-password')
  if(!user) return res.status(404).send('user not found')
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
    .send(_.pick(user, ["id", "username", "isActive"]));
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
  const user = await User.findByIdAndRemove(req.user.id);
  if (!user)
    return res.status(404).send(" The customer with given id is not found");


  const responseData = _.pick(user, ["username"]);
  res.send(responseData);
});
module.exports = router;
