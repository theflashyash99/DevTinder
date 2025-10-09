const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const userAuth = async (req, res, next) => {
  // Read the token from the req cookies.
  try {
    const cookies = req.cookies;
    // Validate the token
    const { token } = cookies;
    if (!token) {
      throw new Error("Token is not valid!!!!!!!!!!");
    }
  // validate the token
    const decordedData = jwt.verify(token, "DEV@Tinder$790");

    const { id } = decordedData;
    // find the user in DB
    const user = await User.findById({ id });
    if (!user) {
      throw new Error("User does not exist in Database!!!");
    }

    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};
module.exports = {
  userAuth,
};
