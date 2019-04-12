const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
  isStaff: Boolean,
  isActive: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const expireTime=parseInt(Date.now())
  const token = jwt.sign(
    {
      _id: this._id,
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
    isAdmin: Joi.boolean(),
    isStaff: Joi.boolean(),
    isActive: Joi.boolean()
  };
  return Joi.validate(user, schema);
}
const User = mongoose.model('User', userSchema);

module.exports = { userSchema, validateUser, User };


