const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { ConnectionRequestModel } = require("../../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    //sending connection request
    try {
      const fromUserId = req.user._id; // from the userAuth middleware the loggedIn user.
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status type: " + status });
      }
        
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status, 
      });

      const data = await connectionRequest.save(); // this will save it to the DB!

      res.json({
        message: "Connection Request Sent Successfully!",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
