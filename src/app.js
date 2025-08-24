const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("../models/user");

app.post("/signup", async (req, res) => {
  //creating a new instance of user.
  const user = new User({
    firstName: "Shivam",
    lastName: "kds",
    email: "shivam@gmail.com",
    password: "123456789",
    age: 21,
  });

  await user.save();
  res.send("User added successfuly");
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

//port and callback
