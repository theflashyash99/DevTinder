const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth"); // if it is exported by in the object it is extracted here by this.
const { ConnectionRequestModel } = require("../../models/connectionRequest");
const User = require("../../models/user");

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoURL",
  "age", 
  "gender",
  "skills",
  "about",
  
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
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const loggedInUser = req.user;


    // find connection request that was ( sent + received ). //! EXplaination :- as the connection request only has the Senders and Receivers IDs. So, what we'll do is we'll find the IDs that present in the Connection MOdel so that we can  exclude them later when we'll fetch the feeed API Data.
    const ConnectionRequest = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id }, // the sender
        { toUserId: loggedInUser._id }, // the receiver
      ],
    }).select("fromUserId toUserId");

     // Remove the duplicate IDs. //! Explaination :-  (in this the connectionRequest model has IDs which were all place whom send the request or send the request. so, we'll extract the necessary one by checking the duplicate and then in the user model we'll check that this IDs people will not be included in the feed) 
    const hideUsersFromFeed = new Set();
    ConnectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } }, // %nin means notIn and Array.from() : it make things into an array.
        { _id: { $ne: loggedInUser._id } }, // $ne =  not Equal too
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

      //! Summary  :-  Connections → Collect IDs → Remove duplicates → Exclude them → Show fresh users
    res.json({data : user});
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = userRouter;
