const { generateAndSendOtp } = require("../services/otpService");
const { signupWithOtp, loginUser, logoutUser, refreshAccessToken } = require("../services/authService");
const { successResponse, errorResponse } = require("../errors/responseHandler");
const { StatusCodes } = require("http-status-codes");
const authMessages = require("../messages/authMessages");

// Send OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(
        res,
        authMessages.ERROR.VALIDATION_FAILED,
        [authMessages.ERROR.EMAIL_REQUIRED],
        StatusCodes.BAD_REQUEST
      );
    }

    await generateAndSendOtp(email);
    return successResponse(
      res,
      authMessages.SUCCESS.OTP_SENT,
      null,
      StatusCodes.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      authMessages.ERROR.OTP_FAILED,
      error.message || authMessages.ERROR.INTERNAL_SERVER_ERROR,
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};


// Verify OTP & Signup
const verifyOtpAndSignup = async (req, res) => {
  try {
    const { email, name, username, password, otp } = req.body;

    if (!email || !name || !username || !password || !otp) {
      return errorResponse(
        res,
        authMessages.ERROR.VALIDATION_FAILED,
        [authMessages.ERROR.ALL_FIELDS_REQUIRED],
        StatusCodes.BAD_REQUEST
      );
    }

    const newUser = await signupWithOtp(email, name, username, password, otp);

    return successResponse(
      res,
      authMessages.SUCCESS.REGISTER_SUCCESS,
      {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      StatusCodes.CREATED
    );
  } catch (error) {
    return errorResponse(
      res,
      authMessages.ERROR.SIGNUP_FAILED,
      error.message || authMessages.ERROR.INTERNAL_SERVER_ERROR,
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(
        res,
        authMessages.ERROR.LOGIN_VALIDATION_FAILED,
        [authMessages.ERROR.EMAIL_REQUIRED, authMessages.ERROR.PASSWORD_REQUIRED],
        StatusCodes.BAD_REQUEST
      );
    }

    const { user, accessToken, refreshToken } = await loginUser({ email, password });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return successResponse(
      res,
      authMessages.SUCCESS.LOGIN_SUCCESS,
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      StatusCodes.OK,
      null,
      accessToken
    );
  } catch (error) {
    return errorResponse(
      res,
      authMessages.ERROR.LOGIN_FAILED,
      error.message,
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Logout
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(400).json({ message: "No refresh token" });

    await logoutUser(refreshToken);
    res.clearCookie("refreshToken");

    return successResponse(res, "Logged out successfully", null, StatusCodes.OK);
  } catch (error) {
    return errorResponse(res, "Logout failed", error.message, error.statusCode || 500);
  }
};

const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const newAccessToken = await refreshAccessToken(token);

    // 👇 Set new access token cookie
    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: false, // ⚠️ set true in production with HTTPS
      sameSite: "strict",
      maxAge: 1000 * 60 * 5, // 5 minutes
    });

    // Also return in JSON (optional, good for frontend apps)
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { sendOtp, verifyOtpAndSignup, login, refresh, logout };