const router = require("express").Router();
const { body } = require("express-validator");
const {
  registerCondidate,
  loginUser,
  forgetPassword,
} = require("../controllers/auth");
const {
  validationLoginData,
  validationCondaidateData,
} = require("../middleware/validationData");

router.post("/condidate", validationCondaidateData, registerCondidate);

router.post("/login", validationLoginData, loginUser);

router.post("/forgetPassword", forgetPassword);

module.exports = router;
