const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: { type: String, trim: true },
  password: { type: String, trim: true },
  isAdmin: Boolean,
  isStaff: Boolean,
  isActive: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      id: this.id,
      isAdmin: this.isAdmin,
      email: this.email,
      isStaff: this.isStaff,
      isActive: this.isActive
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
