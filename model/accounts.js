const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  accountName: { type: String, trim: true, lowercase: true, required: true },
  alias: { type: String, trim: true, lowercase: true },
  tag: { type: String, trim: true, lowercase: true },
  inventoryAffects: Boolean,
  descreption: { type: String, trim: true, lowercase: true },
  openingBalance: { type: Number, default: 0 },
  closingBalanceHistory: [
    {
      date: Date,
      balance: Number
    }
  ],
  closingBalance: Number
});

const Account = mongoose.model("Account", accountSchema);
module.exports = { Account };
