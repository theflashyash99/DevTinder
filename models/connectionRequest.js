const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    // ref: "User",
  },

  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    // ref: "User",
  },

  status: {
    type: String,
    enum: {
      values: ["interested", "ignore", "accepted", "rejected"],
      message: `{VALUE} is an incorrect status type`,
    },
  },
},
{
    timestamps:true,

});

// module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema); 
