const experss = require("express");
const router = experss.Router();
const { User } = require("../model/user");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

router.post("/change-active-status/:id", async (req, res) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!req.body.isActive) return res.status(412).send("No status send");

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: req.body.isActive },
    { new: true }
  );
  if (!user)
    return res.status(404).send(" The user with given id is not found");
  res.send(user);
});

router.post("/change-password/:id", async (req, res) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.oldPassword === req.body.newPassword)
    return res.status(412).send("inavalid password");

  if (!(req.body.oldPassword && req.body.newPassword))
    return res.status(412).send("provide both old and new password");

  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send(" The user with given id is not found");

  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!validPassword) return res.status(400).send("invalid email or password");
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.newPassword, salt);
  await user.save();
  res.send({ user: user, password: req.body.newPassword });
});

router.post("/change-staff-status/:id", async (req, res) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!req.body.isStaff) return res.status(412).send("No staff  status send ");

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isStaff: req.body.isStaff },
    { new: true }
  );
  if (!user)
    return res.status(404).send(" The user with given id is not found");
  res.send(user);
});

router.post("/change-admin-status/:id", async (req, res) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!req.body.isAdmin) return res.status(412).send("No staff  status send ");

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isAdmin: req.body.isAdmin },
    { new: true }
  );
  if (!user)
    return res.status(404).send(" The user with given id is not found");
  res.send(user);
});

function validator(user) {
  const schema = {
    oldPassword: Joi.string(),

    newPassword: Joi.string()
      .min(3)
      .max(1024),
    isAdmin: Joi.boolean(),
    isStaff: Joi.boolean(),
    isActive: Joi.boolean()
  };
  return Joi.validate(user, schema);
}

module.exports = router;
