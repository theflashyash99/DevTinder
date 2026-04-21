const express = require("express");
const { userAuth } = require("../middleware/auth");
const { Chat } = require("../../models/chat");
const chatRounter = express.Router();

chatRounter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
        path:"messages.senderId"  ,
        select:"firstName lastName"
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();

       const targetUser = await User.findById(targetUserId).select(
      "firstName lastName"
    );

     
    }
     res.json(chat);
  } catch (err) {
    console.log(err.messages);
    res.status(500).json({ error: "Server error" }); 
  }
});

module.exports = chatRounter;
