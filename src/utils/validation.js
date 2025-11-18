const validator = require("validator");
const validationSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("The given name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

const validateEditProfileData = (req) =>{
   const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "about",
    "photoURL",
    "email",
    "gender",
    "skills",
  ];

  const isAllowedUpdate = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field))

  return isAllowedUpdate;
};
module.exports = {
  validationSignUpData,
  validateEditProfileData,
};





































