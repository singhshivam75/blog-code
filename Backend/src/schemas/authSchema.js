const Joi = require("joi");

const otpSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).pattern(/^[0-9]+$/).required().messages({
    "string.pattern.base": "OTP must be a 6-digit number.",
    "string.length": "OTP must be exactly 6 digits.",
  }),
  username: Joi.string().min(6).max(50).required(),
  name: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(20).required(),
}).unknown(false);

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(false);

module.exports = { otpSignupSchema, loginSchema };