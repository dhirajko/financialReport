const mongoose = require("mongoose");
const Joi = require("joi");


const transactionSchema = new mongoose.Schema({
    date: Date,
    debitAccount: {
        type: mongoose.Schema.ObjectId,
        ref: 'Account',
        required: true
      },
    creditAccount: {
        type: mongoose.Schema.ObjectId,
        ref: 'Account',
        required: true
      },
    amount: Number,
    descreption: {type : String, trim : true, lowercase: true}
});

function transactionValidator(transactionDetails) {
    schema = {
        date: Joi.date()
            .min('1-1-2017')
            .max(Date.now())
            .required(),
        debitAccount: Joi.string()
            .min(1)
            .max(255),
        creditAccount: Joi.string()
            .min(1)
            .max(255)
            .required(),
        amount: Joi.number()
            .required(),
        descreption: Joi.string(),

    }
    return Joi.validate(transactionDetails, schema);
};

const Transaction =mongoose.model('Transaction',transactionSchema);
module.exports={Transaction,transactionSchema, transactionValidator}