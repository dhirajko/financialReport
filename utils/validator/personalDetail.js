const Joi = require("joi");
function personalDetailValidator(personalDetail) {
  schema = {
    full_name: Joi.string()
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

function dataValidator(data) {
  schema = {
    full_name: Joi.string()
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

module.exports = { personalDetailValidator, dataValidator };
