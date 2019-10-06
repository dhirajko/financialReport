const mongoose = require("mongoose");
const Joi = require("joi");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  date: { type: Date, default: Date.now() },
  debitAccount:  {
    type: mongoose.Schema.ObjectId,
    ref: "Account"
  },
  creditAccount:  {
    type: mongoose.Schema.ObjectId,
    ref: "Account"
  },
  amount: Number,
  descreption: { type: String, trim: true }
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = { Transaction};
