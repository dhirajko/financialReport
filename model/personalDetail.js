const mongoose = require("mongoose");

const personalDetailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  full_name: { type: String, trim: true },
  streetAddress: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  zipCode: { type: Number },
  sex: { type: String, trim: true },
  countryCode: { type: Number },
  phoneNumber: { type: String, trim: true },
  citizenship: { type: String, trim: true },
  socialSecurityNumber: { type: String, trim: true },
  dateOfBirth: { type: Date }
});

const PersonalDetail = mongoose.model("PersonalDetail", personalDetailSchema);
module.exports = { PersonalDetail };
