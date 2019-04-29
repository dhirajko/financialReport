const mongoose = require("mongoose");
const Joi = require("joi");
const { allTags } = require('../utils/listOfTags')

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  accountName: { type: String, trim: true, lowercase: true, required: true, },
  alias: { type: String, trim: true, lowercase: true },
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
    accountName: Joi.string().required(),
    alias: Joi.string(),
    tag: Joi.string().required().valid(allTags),
    inventoryAffects: Joi.boolean(),
    descreption: Joi.string(),
    openingBalance: Joi.number()
  }
  return Joi.validate(accountDetail, schema);
};
function accountSchemavalidatorForEdit(accountDetail) {
  schema = {
    accountName: Joi.string().required(),
    alias: Joi.string(),
    tag: Joi.string().required().valid(allTags),
    inventoryAffects: Joi.boolean(),
    descreption: Joi.string(),
    openingBalance: Joi.number()
  }
  return Joi.validate(accountDetail, schema);
};



const Account = mongoose.model('Account', accountSchema)
module.exports = { accountSchemavalidatorForEdit, accountSchemavalidator, accountSchema, Account }
