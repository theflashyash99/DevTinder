const express = require("express");
const authRouter = express.Router();
const { validationSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

// make user in database by signup.
authRouter.post("/signup", async (req, res) => {
  //creating a new instance of User model.
  //----------------------Manual & Hard-coded data passing
  // const user = new User({
  //   firstName: "Rashid ",
  //   lastName: "Ali",
  //   email: "Rashid@gmail.com",
  //   password: "123456789",
  //   age: 21,
  // });
  //------------------------------The Dyanamic data transfer---------------------------------------------------------------
  //creating a new instance of User model.... ....
  try {
    //validation check function.
    const { firstName, lastName, age, email, password, about, photoURL } =
      req.body;
    validationSignUpData(req);

    // password encryption using bcrypt.hash(value,level of strong encryption 10 is recommanded)

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      age,
      email,
      password: passwordHash,
      about,
      photoURL,
    });

    await user.save();
    res.send("User added successfuly");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});
// login API------------------------------------
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check wheather user is there or not.
    const user = await User.findOne({ email: email });// email as the model has the email as type and email as input the we take from the req.body!!!
    if (!user) {
      throw new Error("Invalid credentials");
    }

    //! using the Mongoosh Schema Method bcrypt.compare.
    const isPasswordValid = await user.validatePassword(password);

    // it return true or false.
    if (isPasswordValid) {
      //JWT logics create and pass it to the cookie.

      //! using the Mongoosh Schema Method JWT.
      const token = await user.getJWT();

      //Add the token to cookies and send the response back to the user.

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7days expiry
      });
      //name and value

      res.send("Login successsful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/logout",async (req,res) => {
  res.cookie("token",null,{
    expires:  new Date(Date.now()),
  });
  res.send("Logout Successfully!!!");
});

module.exports = authRouter;
