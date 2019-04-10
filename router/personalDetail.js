const experss = require("express");
const router = experss.Router();
const {PersonalDetail,personalDetailSchema,personalDetailValidator}=require('../model/personalDetail')


router.post("/", async (req, res) => {
  console.log("I am here");

  const { error } = personalDetailValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(req.body);
  res.send("ok");
});

module.exports = router;
