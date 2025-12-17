const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth"); // if it is exported by in the object it is extracted here by this.
const { ConnectionRequestModel } = require("../../models/connectionRequest");
const User = require("../../models/user");

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "gender",
  "skills",
];

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
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json(data);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 10;
    const skip = (page-1) * limit;

    const loggedInUser = req.user;
    // find connection request that was ( sent + received ).

    const ConnectionRequest = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id }, // the sender
        { toUserId: loggedInUser._id }, // the receiver
      ],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    ConnectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    console.log(hideUsersFromFeed);

    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } }, // %nin means notIn
        { _id: { $ne: loggedInUser._id } }, // $ne =  not Equal too
      ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = userRouter;
