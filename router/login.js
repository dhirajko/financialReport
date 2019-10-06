const express = require("express");
const router = express.Router();
const { login } = require("../controller/login");

router.post("/", async (req, res) => {
  const user = await login(req.body);
  return res.status(user.status_code).send(user);
});
module.exports = router;
