const otpGenerator = require("otp-generator");
const { createOtp } = require("../daos/otpDao");
const sendEmail = require("../utils/sendEmail");
const { findUserByEmail } = require("../daos/userDao");
const { StatusCodes } = require("http-status-codes");

const generateAndSendOtp = async (email) => {

  if (await findUserByEmail(email)) {
    const err = new Error("Email is already registered.");
    err.statusCode = StatusCodes.CONFLICT;
    throw err;
  }

  const otp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  await createOtp(email, otp);
  await sendEmail(email, "Your OTP for Signup", `Your OTP is: ${otp}`);
};

module.exports = { generateAndSendOtp };