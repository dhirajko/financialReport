const mongoose = require("mongoose");
const Joi = require("joi");


const transactionSchema = new mongoose.Schema({
    user: {
        type: new mongoose.Schema({
            username: String
        }),
        required: true
    },
    date: Date,
    debitAccount: String,
    creditAccount: String,
    amount: Number,
    descreption: String
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

const Transaction =mongoose.model('transaction',transactionSchema);
module.exports={Transaction,transactionSchema, transactionValidator}