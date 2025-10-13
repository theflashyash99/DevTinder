const express = require("express");
const requestRouter = express.Router();


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //sending connection request
  const user = req.user;

  res.send(user.firstName + " send the connection request!!");
});



module.exports= requestRouter;