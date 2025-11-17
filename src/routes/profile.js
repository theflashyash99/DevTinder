const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");

// getting user profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("profile/edit",userAuth, async (req,res)=> {

  

  const allowedEditFields = 
  ["firstName","lastName","age","about","photoURL","email","gender","skills"];

  const isAllowedUpdate = Object.keys(req.body).every((field) => allowedEditFields.includes(field))



});
module.exports = profileRouter;
