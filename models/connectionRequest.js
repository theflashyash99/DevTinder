const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

// create index on the fromUserId and toUserId for the optimization.
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// before saving it will check this equal fucntion automatically on every single run.
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(this.toUserId)) {
    throw new Error("You Can't Send Request To Yourself!!");
  }
  next();
});

// creating the model
const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = {
  ConnectionRequestModel,
};
