const socket = require("socket.io");
const { Chat } = require("../../models/chat");
const { userAuth } = require("../middleware/auth");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: ["http://localhost:5173","https://dev-tinder-web-two-beta.vercel.app"] ,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("_"); // this is the Unique id for clearing the room. we sort so that the id is same for the sender and receiver.
      console.log(firstName + " Joining Room: " + roomId);

      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName,lastName, userId, targetUserId, text }) => {
        //saving message in the database.
        try {
          const roomId = [userId, targetUserId].sort().join("_");
          console.log(firstName + " " + text);
          //findind if the chat is present or not
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();

          io.to(roomId).emit("messageReceived", { firstName,lastName, text }); // send to the specific room.
        } catch (err) {
          console.log(err.message);
        }
      },
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
