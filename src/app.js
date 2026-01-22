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

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//      // frontend domain
//      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     credentials: true,               // it will let you add token and cookies inside the browser.
//   })
// );



// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//   credentials: true,
//   allowedHeaders: "Content-Type,Authorization",
// };

// app.use(cors(corsOptions));
// app.options("/", cors(corsOptions));

// import cors from "cors";
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173" ,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));







const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDb()
  .then(() => {
    console.log("Database connection established.........");
    app.listen(9999, () => {
      console.log("The Server is running on port 9999!");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!!!");
  });

// now time for Validation for the backened-----------------------------------

//port and callback---
