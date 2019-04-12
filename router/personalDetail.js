const experss = require("express");
const router = experss.Router();
const Joi = require("joi");
const {
  PersonalDetail,
  personalDetailValidator
} = require("../model/personalDetail");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  req.user = { _id: "5cb068997bb1e813fe2fc21d", username: "sample" };
  const personalDetail = await PersonalDetail.find({});
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
  personalDetail = new PersonalDetail(payload);
  await personalDetail.save();
  res.send(personalDetail);
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
  res.send(personalDetail);
});

function dataValidator(data) {
  schema = {
    name: Joi.string()
      .min(1)
      .max(255),
    streetAddress: Joi.string()
      .min(1)
      .max(255),
    city: Joi.string()
      .min(1)
      .max(255),
    state: Joi.string()
      .min(1)
      .max(255),
    zipCode: Joi.number()
      .integer()
      .min(10000)
      .max(99999),
    sex: Joi.string().valid(["male", "female", "other"]),
    countryCode: Joi.number()
      .integer()
      .min(1)
      .max(999),
    phoneNumber: Joi.string()
      .min(10)
      .max(10),
    email: Joi.string().email(),
    citizenship: Joi.string()
      .min(1)
      .max(255),
    socialSecurityNumber: Joi.string()
      .min(1)
      .max(255),
    dateOfBirth: Joi.date()
      .min("1900-09-28")
      .max(Date.now())
  };
  return Joi.validate(data, schema);
}
module.exports = router;
