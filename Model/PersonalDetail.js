const mongoose = require("mongoose");
const Joi = require("joi");
const user = require("./User");

const personalDetailSchema = new mongoose.Schema({
  user: {
    type: user,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  streetAddress: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  city: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  state: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  zipCode: {
    type: Number,
    required: true,
    min: 10000,
    max: 99999
  },
  sex: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },
  countryCode: {
    type: Number,
    required: true,
    min: 1,
    max: 999
  },
  phoneNumber: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  citizenship: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  socialSecurityNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  dateOfBirth: {
    type: Date,
    required: true,
    min: "1900-09-28",
    max: Date.now()
  }
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
      .required()
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
    phoneNumber: Joi.number()
      .required()
      .integer()
      .minlength(10)
      .max(9999999999),
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
      .required()
  };

  return Joi.validate(personalDetail, schema);
}
const PersonalDetail = mongoose.model("PersonalDetail", personalDetailSchema);
module.exports = {
  PersonalDetail,
  personalDetailSchema,
  personalDetailValidator
};
/*
{ 
    name: "dhiraj",
    streetAddress:"kilonrinne 10 D 76" ,
    city: "Espoo",
    state: "Uusimaa",
    zipCode: 02610,
    sex: "male"
    countryCode: 358,
    phoneNumber: 0469553614,
    citizenship: "Nepal",
    socialSecurityNumber: 666778333,
    dateOfBirth:"1991-09-28"
  };


*/
