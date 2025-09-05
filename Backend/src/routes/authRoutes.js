const express = require("express");
const validate = require('../middlewares/validateMiddleware');

const {
  login,
  sendOtp,
  verifyOtpAndSignup,
  refresh,
  logout
} = require("../controllers/authController");

const {
  otpSignupSchema,
  loginSchema
} = require("../schemas/authSchema");

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", validate(otpSignupSchema), verifyOtpAndSignup);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/login", validate(loginSchema), login);

module.exports = router;  