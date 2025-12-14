const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth"); // if it is exported by in the object it is extracted here by this.
const { ConnectionRequestModel } = require("../../models/connectionRequest");

const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl" ,"age" , "gender", "skills"]

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id, // to find the see the connection request as the toUser is the one who got the request
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
        $or : [
            {toUserId: loggedInUser._id ,status : "accepted"},
            {fromUserId : loggedInUser._id , status : "accepted"   },
        ]
    }).populate("fromUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row)=> row.fromUserId)
    res.json(data)
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = userRouter;
