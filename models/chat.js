const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
        required:true, 
    }

},{timestamps:true});

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // if we dont't use ref then the Populate will not work. Ref is used to connect two mongo collections.
      required: true,
    },
  ],

  messages:[messageSchema]
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { Chat };
