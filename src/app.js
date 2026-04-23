const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("../models/user");
const { validationSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

// import cors from "cors";
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
   origin: ["http://localhost:5173","https://dev-tinder-web-two-beta.vercel.app"] ,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const socket = require("socket.io");
const initializeSocket = require("./utils/socket");
const chatRounter = require("./routes/chatRoute");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRounter);

const server = http.createServer(app);
initializeSocket(server);

connectDb()
  .then(() => {
    console.log("Database connection established.........");
    server.listen(process.env.PORT, () => {
      console.log("The Server is running on port 9999!");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!!!");
  });

// now time for Validation for the backened-----------------------------------

//port and callback---
