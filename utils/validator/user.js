const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(3)
      .max(255)
      .required(),

    password: new PasswordComplexity({
      min: 8,
      max: 30,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 2
    }).required(),
    name: Joi.string(),
    isAdmin: Joi.boolean(),
    isStaff: Joi.boolean(),
    isActive: Joi.boolean()
  };
  return Joi.validate(user, schema);
}

function passWordValidator(password) {
  const complexityOptions = {
    min: 10,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2
  };
  return Joi.validate(password, new PasswordComplexity(complexityOptions));
}

module.exports = { validateUser, passWordValidator };
