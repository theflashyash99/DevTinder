const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("../models/user");
const { validationSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());
// make user in database by signup.
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // it return true or false.
    if (isPasswordValid) {
      //JWT logics create and pass it to the cookie.
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790" , {expiresIn:"0d"});

      //Add the token to cookies and send the response back to the user.

      res.cookie("token", token , {expires : new Date (Date.now() + 8 * 36000000,)});
      //name and value

      res.send("Login successsful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
// getting user profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    // const cookies = req.cookies;
    // // to get the cookies we'll use the cookies. as it's not a method we'll not execute it...........

    // // Process -: get the cookie and extract token and decode it then extract the id then find the user.........

    // const { token } = cookies;
    // if (!token) {
    //   throw new Error("Invalid token");
    // }

    // const decorded = await jwt.verify(token, "DEV@Tinder$790");
    // const { _id } = decorded;

    // const user = await User.findById(_id);
    // if (!user) {
    //   throw new Error("User does not exisr!!!");
    // }

    //! we get this user from the Auth.JS as we give it to the req as (req.user = user [before next]) to access it from here
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// send connection  request.
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //sending connection request
  const user = req.user;

  res.send(user.firstName + " send the connection request!!");
});

connectDb()
  .then(() => {
    console.log("Database connection established.........");
    app.listen(9999, () => {
      console.log("The Server is running on port 9999!");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!!!");
  });

// now time for Validation for the backened-----------------------------------

//port and callback---
