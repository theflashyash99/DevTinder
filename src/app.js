const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("../models/user");
const { validationSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

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
    if (isPasswordValid) {
      //JWT logics create and pass it to the cookie.
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790");
      console.log(token);

      //Add the token to cookies and send the response back to the user.

      res.cookie("token", token);
      //name and value

      res.send("Login successsful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    // to get the cookies we'll use the cookies. as it's not a method we'll not execute it.

    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid token");
    }

    const decorded = await jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decorded;
   

    const userId = await User.findById(_id);
    if (!userId) {
      throw new Error("User does not exisr!!!");
    }

    res.send(userId);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

//Finding the user based on email condition.
app.get("/feed", async (req, res) => {
  z;
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    console.error("Something went wrong!!!");
  }
});
// finding all the user in the query DB.
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User not found!!!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});

// finding the one user in the data database

app.get("/one", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.findOne({ email: userEmail });
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});

// delete a user------------------------------------------------
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send("User has been deleted!!!");
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});

// update a user-- and validation on the Give API for the selective field can be updated.

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  // whole data given in the body of postman will be extracted here.
  const data = req.body;

  // making AllowedUser API Validation

  try {
    const Allowed_User = [
      "firstName",
      "age",
      "gender",
      "skills",
      "about",
      "photoURL",
    ];

    const isAllowed = Object.keys(data).every((k) => Allowed_User.includes(k));
    // every check the statement and return the true or false. it work on arrays

    if (!isAllowed) {
      throw new Error("Updating  not allowed");
    }

    // skills valifation for it has only 5 skills
    if (data.skills.length > 10) {
      throw new Error("The skills should be not be more than 10");
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(updatedUser);
    res.send("User's data has been updated!!!");
  } catch (err) {
    res.status(400).send("UPDATE FAILED : " + err.message);
  }
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
