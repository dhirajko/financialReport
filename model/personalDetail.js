const mongoose = require("mongoose");
const Joi = require("joi");


const personalDetailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
    required: true
  },
  name: String,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: Number,
  sex: String,
  countryCode: Number,
  phoneNumber: String,
  email: String,
  citizenship: String,
  socialSecurityNumber: String,
  dateOfBirth: Date
});
function personalDetailValidator(personalDetail) {
  schema = {
    name: Joi.string()
      .min(1)
      .max(255)
      .required(),
    streetAddress: Joi.string()
      .min(1)
      .max(255)
      .required(),
    city: Joi.string()
      .min(1)
      .max(255)
      .required(),
    state: Joi.string()
      .required()
      .min(1)
      .max(255)
      .required(),
    zipCode: Joi.number()
      .required()
      .integer()
      .min(10000)
      .max(99999),
    sex: Joi.string()
      .required()
      .valid(["male", "female", "other"]),
    countryCode: Joi.number()
      .required()
      .integer()
      .min(1)
      .max(999),
    phoneNumber: Joi.string()
      .required()
      .min(10)
      .max(10),
    email: Joi.string()
      .required()
      .email(),
    citizenship: Joi.string()
      .min(1)
      .max(255)
      .required(),
    socialSecurityNumber: Joi.string()
      .min(1)
      .max(255)
      .required(),
    dateOfBirth: Joi.date()
      .min("1900-09-28")
      .max(Date.now())
      .required(),
    userId: Joi.string()
  };

  return Joi.validate(personalDetail, schema);
}
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


const PersonalDetail = mongoose.model("PersonalDetail", personalDetailSchema);
module.exports = {
  PersonalDetail,
  personalDetailSchema,
  personalDetailValidator, dataValidator
};
/*
{
    name: 'dhiraj',
    streetAddress:'kilonrinne 10 D 76' ,
    city: 'Espoo',
    state: 'Uusimaa',
    zipCode: 02610,
    sex: 'male'
    countryCode: 358,
    phoneNumber: 0469553614,
    citizenship: 'Nepal',
    socialSecurityNumber: 666778333,
    dateOfBirth:'1991-09-28'
  };


*/
