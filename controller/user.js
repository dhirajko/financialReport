const { User } = require("../model/user");
const { failed, success } = require("../const/response");
const { validateUser } = require("../utils/validator/user");
const bcrypt = require("bcryptjs");

const readUser = async () => {
  const users = await User.find({}).select("email isAdmin isStaff isActive ");
  return success(200, users);
};

const readUserById = async id => {
  const user = await User.find({ _id: id }).select(
    "email isAdmin isStaff isActive "
  );
  return success(200, user);
};

const readUserByEmail = async email => {
  const user = await User.find({ email: email }).select(
    "email isAdmin isStaff isActive "
  );
  return success(200, user);
};

const createUser = async body => {
  const { error } = validateUser(body);
  if (error) return failed(400, error.details[0].message);

  let user = await User.findOne({ email: body.email });
  if (user) return failed(422, "User already exist");

  user = new User(body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  let a = await user.save();

  return success(201, {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isStaff: user.isStaff,
    isActive: user.isActive,
    token: user.generateAuthToken()
  });
};

module.exports = {
  createUser,
  readUser,
  readUserById,
  readUserByEmail
};
