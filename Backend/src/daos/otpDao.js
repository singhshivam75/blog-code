const Otp = require("../models/otp");

const createOtp = async (email, otp) => {
  return await Otp.create({ email, otp });
};

const findOtp = async (email, otp) => {
  return await Otp.findOne({ email, otp, });
};

const deleteOtpByEmail = async (email) => {
  return await Otp.deleteMany({ email });
};

module.exports = { createOtp, findOtp, deleteOtpByEmail };
