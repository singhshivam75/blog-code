const User = require("../models/user");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const createUser = async (data) => {
  return await User.create(data);
};

const saveRefreshToken = async (userId, refreshToken) => {
  return await User.findByIdAndUpdate(
    userId,
    { $push: { refreshTokens: { token: refreshToken } } },
    { new: true }
  );
};

const removeRefreshToken = async (userId, refreshToken) => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { refreshTokens: { token: refreshToken } } },
    { new: true }
  );
};

const findUserByRefreshToken = async (refreshToken) => {
  return await User.findOne({ "refreshTokens.token": refreshToken });
};

module.exports = {
  findUserByEmail,
  findUserByUsername,
  createUser,
  saveRefreshToken,
  removeRefreshToken,
  findUserByRefreshToken,
};