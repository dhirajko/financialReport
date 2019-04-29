const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
  username: { type: String, trim: true },
  password: { type: String, trim: true },
  name: { type: String, trim: true },
  isAdmin: Boolean,
  isStaff: Boolean,
  isActive: Boolean,
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
  
});

userSchema.methods.generateAuthToken = function () {
  const expireTime = Date.now() + 900000;
  const token = jwt.sign(
    {
      id: this.id,
      isAdmin: this.isAdmin,
      username: this.username,
      isStaff: this.isStaff,
      isActive: this.isActive,
      expireTime: expireTime
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

function validateUser(user) {
  const schema = {
    username: Joi.string()
      .min(3)
      .max(255)
      .required(),

    password: Joi.string()
      .min(3)
      .max(1024)
      .required(),
    name: Joi.string()
      .min(1)
      .max(255)
      .required(),
    isAdmin: Joi.boolean(),
    isStaff: Joi.boolean(),
    isActive: Joi.boolean()
  };
  return Joi.validate(user, schema);
}

function passWordValidator(password) {
  const schema = {
    newPassword: Joi.string()
      .min(3)
      .max(1024)
      .required(),
    oldPassword: Joi.string()
      .min(3)
      .max(1024)
      .required()
  };
  return Joi.validate(password, schema);
}
const User = mongoose.model('User', userSchema);
module.exports = { userSchema, passWordValidator, validateUser, User };


