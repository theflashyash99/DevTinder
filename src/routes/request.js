const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");



requestRouter.post("/request/send/interested/:toUserId", userAuth, async (req, res) => {
  //sending connection request
  try{
  const fromUserId = req.user._id;

  res.send(user.firstName + " send the connection request!!");
  }catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
});



module.exports = requestRouter;