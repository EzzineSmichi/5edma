const {
  passwordHash,
  generateAuthToken,
  comparedPassword,
  generatePassword,
  sendPasswordMail,
} = require("../helpers/auth");
const Condidate = require("../models/user/candidate");
const Recruiter = require("../models/user/recruiter");

const registerCondidate = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password, birthDate } = req.body;

  try {

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
  console.log(req.body);
  const { email, password } = req.body;

  try {

    const user = await Condidate.findOne({ email });
    console.log({ user });

    if (!user) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    const matchedPassword = await comparedPassword(password, user.password);
    console.log({ matchedPassword });
    if (!matchedPassword) {
      return res.status(401).send({ message: "Invalid Credentials" });
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

const forgetPassword = (req, res) => {
  const { email } = req.body;
  try {
    let user = await Condidate.findOne({email}) || await Recruiter.findOne({email})

    if(!user) {
        return res.status(400).send({ success: false, message: "No User with this email" });
    }

    const newPassword = generatePassword();

    await Condidate.findOneAndUpdate(email,
        { password: await passwordHash(newPassword)  },
        { upsert: false })

    sendPasswordMail(email, newPassword);

    return res
        .status(201)
        .send({ success: true, message: "New password has sent to your email" });
  } catch (error) {
    
  }
};

module.exports = { registerCondidate, loginUser, forgetPassword };
