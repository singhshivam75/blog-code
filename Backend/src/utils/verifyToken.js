const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>
  jwt.sign({ userId: user._id, email: user.email }, process.env.ACCESS_SECRET, {
    expiresIn: "5m",
  });

const generateRefreshToken = (user) =>
  jwt.sign({ userId: user._id, email: user.email }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
