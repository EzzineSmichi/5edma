const router = require("express").Router();
const {
  registerCondidate,
  loginUser,
  forgetPassword,
} = require("../controllers/auth");

router.post("/condidate", registerCondidate);

router.post("/login", loginUser);

router.post("/forgetPassword", forgetPassword);

module.exports = router;
