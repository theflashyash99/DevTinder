const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("../models/user");


app.use(express.json())

app.post("/signup", async (req, res) => {
  console.log(req.body)
  //creating a new instance of User model.
//   const user = new User({
//     firstName: "Rashid ",
//     lastName: "Ali",
//     email: "Rashid@gmail.com",
//     password: "123456789",
//     age: 21,
//   });
//   try {
//     await user.save();
//     res.send("User added successfuly");
//   } catch (err) {
//     res.send("Problem with adding User:" + err.message);
//   }



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
