const { body, validationResult } = require("express-validator");

const validationCondaidateData = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  body("firstName")
    .isEmpty()
    .withMessage("First Name is required")
    .isLength({
      min: 3,
    })
    .withMessage("First Name greater than 3 caracteres ")
    .contains(Number)
    .withMessage(`First name don't must be contains any number`),
  body("lastName")
    .isEmpty()
    .withMessage("Last Name is required")
    .isLength({
      min: 3,
    })
    .withMessage("Last Name greater than 3 caracteres ")
    .contains(Number)
    .withMessage(`Last name don't must be contains any number`),
];

const validationLoginData = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    ),
];

const handleErrorsDataValidation = (req) => {
  return validationResult(req);
};

module.exports = {
  validationLoginData,
  validationCondaidateData,
  handleErrorsDataValidation,
};
