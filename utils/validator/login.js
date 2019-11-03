const Joi = require("joi");
function loginValidataor(body) {
  schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };
  return Joi.validate(body, schema);
}
module.exports = { loginValidataor };
