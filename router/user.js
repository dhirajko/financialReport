const express = require("express");
const router = express.Router();
const {assetList}= require("../const/listOfTags")
const {
  createUser,
  readUser,
  readUserById,
  readUserByEmail
} = require("../controller/user");
const auth= require("../middleware/auth")

router.get("/", async (req, res) => {
  if (req.query.email) {
    const users = await readUserByEmail(req.query.email);
    return res.status(users.status_code).send(users);
  }
  const users = await readUser();
  return res.status(users.status_code).send(users);
});

router.get("/a",auth, async (req, res) => {
  return res.status(200).send(assetList);
});

router.get("/:id", auth, async (req, res) => {
  const user = await readUserById(req.params.id);
  return res.status(user.status_code).send(user);
});

router.post("/", async (req, res) => {
  const user = await createUser(req.body);
  return res.status(user.status_code).send(user);
});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});
module.exports = router;
