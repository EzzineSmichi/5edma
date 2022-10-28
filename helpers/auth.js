const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generator = require("generate-password");
const nodemailer = require("nodemailer");

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

const generatePassword = () => {
  return generator.generate({
    length: 10,
    numbers: true,
  });
};
const sendPasswordMail = (email, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.myEmail,
      pass: process.env.myPassword,
    },
  });

  const mailOptions = {
    from: process.env.myEmail,
    to: email,
    subject: "reset password",
    text: `Your new Password is: ${password}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  passwordHash,
  comparedPassword,
  generateAuthToken,
  generatePassword,
  sendPasswordMail,
};
