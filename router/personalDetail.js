const experss = require("express");
const router = experss.Router();
const {
  dataValidator,
  PersonalDetail,
  personalDetailValidator
} = require("../model/personalDetail");
const _ = require('lodash')
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const personalDetail = await PersonalDetail.findOne({ "user._id": req.user._id });
  res.send(personalDetail);
});

router.post("/", auth, async (req, res) => {
  const { error } = personalDetailValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let personalDetail = await PersonalDetail.findOne({
    "user._id": req.user._id
  });
    
  if (personalDetail) return res.status(200).send(personalDetail);
  const payload = {
    ...req.body,
    user: {
      _id: req.user._id,
      username: req.user.username
    }
  };
  console.log('I am here');
  
  personalDetail = new PersonalDetail(payload);
  await personalDetail.save();
  
  res.status(201).send(personalDetail);
});

router.put("/", auth, async (req, res) => {
  const { error } = dataValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const personalDetail = await PersonalDetail.findOneAndUpdate(
    { "user._id": req.user._id },
    { $set: req.body },
    { new: true }
  );
  if (!personalDetail)
    return res.status(404).send("personal detail  not found ");
  res.send(personalDetail);
});

router.delete("/", auth, async (req, res) => {
  const personalDetail = await PersonalDetail.findOneAndRemove({
    "user._id": req.user._id
  });
  if (!personalDetail)
    return res.status(404).send("personal detail  not found ");
  res.status(200).send(personalDetail);
});


module.exports = router;
