const bcrypt = require("bcryptjs");
const { User } = require("../model/user");
const { loginValidataor } = require("../utils/validator/login");
const { success, failed } = require("../const/response");
const login = async body => {
  const { error } = loginValidataor(body);
  if (error) return failed(400, error.details[0].message);

  let user = await User.findOne({ email: body.email });
  if (!user) return failed(400, "invalid email");

  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) return failed(400, "invalid password");

  const token = user.generateAuthToken();
  let payload = {
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
    isStaff: user.isStaff,
    isActive: user.isActive,
    token: token
  };
  return success(200, payload);
};

module.exports = { login };
