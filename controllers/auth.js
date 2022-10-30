const { validationResult } = require("express-validator");
const {
  passwordHash,
  generateAuthToken,
  comparedPassword,
  generatePassword,
  sendPasswordMail,
} = require("../helpers/auth");
const { handleErrorsDataValidation } = require("../middleware/validationData");
const Condidate = require("../models/user/candidate");
const Recruiter = require("../models/user/recruiter");

const registerCondidate = async (req, res) => {
  const { firstName, lastName, email, password, birthDate } = req.body;

  try {
    const errors = handleErrorsDataValidation(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const exist =
      (await Condidate.findOne({ email })) ||
      (await Recruiter.findOne({ email }));

    if (exist) {
      return res.status(401).json({ message: "User already exists" });
    }

    const user = new Condidate({
      firstName,
      lastName,
      email,
      password: await passwordHash(password),
      birthDate,
    });

    await user.save();

    return res.status(201).json({
      token: generateAuthToken(user),
      user: { firstName, lastName, email, birthDate },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const errors = handleErrorsDataValidation(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await Condidate.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    const matchedPassword = await comparedPassword(password, user.password);

    if (!matchedPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    return res.status(200).json({
      token: generateAuthToken,
      user: user,
      message: "Login Succesful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let user =
      (await Condidate.findOne({ email })) ||
      (await Recruiter.findOne({ email }));

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "No User with this email" });
    }

    const newPassword = await passwordHash(generatePassword());

    await Condidate.findByIdAndUpdate(
      user._id,
      { password: newPassword },
      { upsert: false }
    );

    sendPasswordMail(email, newPassword);
    return res
      .status(201)
      .send({ success: true, message: "New password has sent to your email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { registerCondidate, loginUser, forgetPassword };
