const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
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
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{value} is an incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this
  if (connectionRequest.fromUserId.equals(this.toUserId)) {
    throw new Error("You Can't Send Request To Yourself!!");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = {
  ConnectionRequestModel,
};
