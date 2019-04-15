const mongoose = require("mongoose");
const Joi = require("joi");

const ledgerAccountSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      username: String
    }),
    required: true
  },
  accountName: String,
  alias: String,
  tag: String,
  inventoryAffects: Boolean,
  descreption: String,
  openingBalance: Number,
  //transactions : [Transactions],
  closingBalanceHistory:[{
    date: Date,
    balance: Number
  }],
  closingBalance : Number,
});

listOfTags = ['bank account',
  'capital account',
  'cash in hand',
  'current liability',
  'current assets',
  'deposits (assets)',
  'direct expenses',
  'direct incomes',
  'duties and tax',
  'fixed assets',
  'indirect expenses',
  'indirect incomes',
  'investment',
  'loan (liability)',
  'loan (assets)',
  'provisions',
  'reserves and surplus',
  'sales account',
  'secured loan',
  'stock in hand',
  'sundry creditors',
  'sundry debtors']

function accountSchemavalidator(accountDetail) {
  schema = {
    accountName: Joi.string()
      .min(1)
      .max(255)
      .required(),
    alias: Joi.string()
      .min(1)
      .max(255),
    tag: Joi.string()
      .required()
      .valid(listOfTags),
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
    openingBalance: Joi.number(),  }
  return Joi.validate(accountDetail, schema);
};
const LedgerAccount = mongoose.model('ledgerAccount', ledgerAccountSchema)

module.exports = {accountSchemavalidatorForEdit, accountSchemavalidator, ledgerAccountSchema, LedgerAccount }
