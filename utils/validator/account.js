const Joi = require("joi");
const { list } = require("../../const/listOfTags");
Joi.objectId = require("joi-objectid")(Joi);

const accountValidator = accountDetail => {
  schema = {
    user: Joi.objectId().required(),
    accountName: Joi.string().required(),
    alias: Joi.string(),
    tag: Joi.string()
      .valid(list)
      .required(),
    inventoryAffects: Joi.boolean(),
    descreption: Joi.string(),
    openingBalance: Joi.number()
  };
  return Joi.validate(accountDetail, schema);
};

function updateValidator(accountDetail) {
  schema = {
    accountName: Joi.string().required(),
    alias: Joi.string(),
    tag: Joi.string()
      .valid(list)
      .required(),
    inventoryAffects: Joi.boolean(),
    descreption: Joi.string(),
    openingBalance: Joi.number()
  };
  return Joi.validate(accountDetail, schema);
}

module.exports = { accountValidator, updateValidator };
