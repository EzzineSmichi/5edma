const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passwordHash = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

const comparedPassword = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

const generateAuthToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { passwordHash, comparedPassword, generateAuthToken };
