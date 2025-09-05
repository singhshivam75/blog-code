const bcrypt = require("bcryptjs");
const {
  findUserByEmail,
  findUserByUsername,
  createUser,
  saveRefreshToken,
  removeRefreshToken,
  findUserByRefreshToken,
} = require("../daos/userDao");
const { findOtp, deleteOtpByEmail } = require("../daos/otpDao");
const { generateAccessToken, generateRefreshToken, verifyToken } = require("../utils/verifyToken");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors/AppError");

const signupWithOtp = async (email, name, username, password, otp) => {
  const existingOtp = await findOtp(email, otp);
  if (!existingOtp) throw new AppError("Invalid or expired OTP", StatusCodes.UNAUTHORIZED);

  if (await findUserByEmail(email)) throw new AppError("Email is already registered", StatusCodes.CONFLICT);
  if (await findUserByUsername(username)) throw new AppError("Username is already taken", StatusCodes.CONFLICT);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await createUser({
      email,
      name,
      username,
      password: hashedPassword,
      isVerified: true,
    });

    await deleteOtpByEmail(email);
    return newUser;
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      throw new AppError(`${field} already exists`, StatusCodes.CONFLICT);
    }
    throw error;
  }
};


const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await saveRefreshToken(user._id, refreshToken);

  return { user, accessToken, refreshToken };
};

// Logout User
const logoutUser = async (refreshToken) => {
  const user = await findUserByRefreshToken(refreshToken);
  if (!user) return null;

  await removeRefreshToken(user._id, refreshToken);
  return true;
};

// Refresh access token
const refreshAccessToken = async (refreshToken) => {
  const user = await findUserByRefreshToken(refreshToken);
  if (!user) throw new AppError("Invalid refresh token", StatusCodes.UNAUTHORIZED);

  await verifyToken(refreshToken, process.env.REFRESH_SECRET);
  return generateAccessToken(user);
};

module.exports = { signupWithOtp, loginUser, logoutUser, refreshAccessToken };
