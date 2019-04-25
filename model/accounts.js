const mongoose = require("mongoose");
const Joi = require("joi");
const { allTags } = require('../accountingFunctions/listOfTags')

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  accountName: { type: String, trim: true, lowercase: true,required: true, },
  alias: { type: String, trim: true, lowercase: true},
  tag: { type: String, trim: true, lowercase: true },
  inventoryAffects: Boolean,
  descreption: { type: String, trim: true, lowercase: true },
  openingBalance: { type: Number, default: 0 },
  particular: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
  closingBalanceHistory: [{
    date: Date,
    balance: Number
  }],
  closingBalance: Number,
});


function accountSchemavalidator(accountDetail) {
  schema = {
    accountName: Joi.string()
      .min(1)
      .max(255)
      .required(),
    alias: Joi.string()
      .min(1)
      .max(255)
      .optional(),
    tag: Joi.string()
      .required()
      .valid(allTags),
    inventoryAffects: Joi.boolean()
      .required(),
    descreption: Joi.string(),
    openingBalance: Joi.number()
      .required()
  }
  return Joi.validate(accountDetail, schema);
};

function accountSchemavalidatorForEdit(accountDetail) {
  schema = {
    accountName: Joi.string()
      .min(1)
      .max(255),

    alias: Joi.string()
      .min(1)
      .max(255),
    tag: Joi.string()
      .required()
      .valid(listOfTags),
    inventoryAffects: Joi.boolean(),
    descreption: Joi.string(),
    openingBalance: Joi.number()
  }
  return Joi.validate(accountDetail, schema);
};
const Account = mongoose.model('Account', accountSchema)
module.exports = { accountSchemavalidatorForEdit, accountSchemavalidator, accountSchema, Account }
