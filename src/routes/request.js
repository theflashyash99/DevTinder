const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");



requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //sending connection request
  const user = req.user;

  res.send(user.firstName + " send the connection request!!");
});



module.exports = requestRouter;