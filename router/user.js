const experss = require("express");
const router = experss.Router();
const { userSchema, validateUser, User } = require("../model/user");

router.post("/", async (req, res) => {
  console.log("I am here");

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(req.body);
  res.send("ok");
});

module.exports = router;
