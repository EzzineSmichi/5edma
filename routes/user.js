const router = require("express").Router();
const { registerCondidate, loginUser } = require("../controllers/auth");

router.post("/condidate", registerCondidate);

router.post("/login", loginUser);

module.exports = router;
