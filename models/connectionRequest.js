const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // ref: "User",
  },

  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // ref: "User",
  },

  status: {
    type: String,
    required:true,
    enum: {
      values: ["interested", "ignored", "accepted", "rejected"],   
      message: `{value} is an incorrect status type`,
    },
  },
},
{
    timestamps:true,

});

const ConnectionRequestModel =  new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports ={
    ConnectionRequestModel,

}