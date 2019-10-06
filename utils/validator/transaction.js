const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function transactionValidator(transactionDetails) {
  schema = {
    user: Joi.objectId().required(),
    date: Joi.date()
      .min("1-1-2017")
      .max(Date.now())
      .required(),
    debitAccount: Joi.objectId().required(),
    creditAccount: Joi.objectId().required(),
    amount: Joi.number().required(),
    descreption: Joi.string()
  };
  return Joi.validate(transactionDetails, schema);
}

module.exports = { transactionValidator };
