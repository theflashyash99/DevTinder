const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("../models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  //creating a new instance of User model.
  //----------------------Manual & Hard-coded data passing
  // const user = new User({
  //   firstName: "Rashid ",
  //   lastName: "Ali",
  //   email: "Rashid@gmail.com",
  //   password: "123456789",
  //   age: 21,
  // });

  //------------------------------The Dyanamic data transfer---------------------------------------
  //creating a new instance of User model.
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfuly");
  } catch (err) {
    res.send("Problem with adding User:" + err.message);
  }
});

//Finding the user based on email condition.
app.get("/feed", async (req, res) => {
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

 // update a user---------------------------------

 app.patch("/user",async (req,res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
     const updatedUser = await User.findByIdAndUpdate({_id : userId}, data,{returnDocument : "after" , runValidators : true,});
     console.log(updatedUser);
     res.send("User's data has been updated!!!")
  } catch (err) {
    res.status(400).send(err.message);
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


  // now time for Validation for the backened----------------------------------------------

//port and callback---
