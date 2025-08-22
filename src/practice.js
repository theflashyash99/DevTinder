// execute the express and store in the app.

//route and callback (req,res)
app.use("/", (req, res) => {
  res.send("Hello! this is the dashboard!");
});

app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.query)
 // it will let you read the URL queries.

 console.log(req.params)
 // it will let you read the URL Dynamic Params.
  res.send({ firstName: "Yash", lastName: "Jaiswal" });
});

app.post("/user", (req, res) => {
  //DB logic
  res.send("Data is successfully transfer to the DB!");
});

app.delete("/user", (req,res) => {
  res.send("Production code DB is Deleted! You are fucked and Fired!!!!!")
})

app.use("/user" , (req,res)=>{
  res.send("HAHAHAHAHHAHAHA!!!!")
})

app.use("/test", (req, res) => {
  res.send("Hello! Yash from Server");
});

app.use("/hello", (req, res) => {
  res.send("Hello Ji!");
});

app.use("/", (req, res) => {
  res.send("Hello! this is the dashboard!");
});

! Middleware

app.use("/", (req, res, next) => {
  next(); // it will directly send the callstack to the next function to execute the next fucntion and when it finishes the execution it will come back here again.
});

app.get(
  "/user",
  (req, res, next) => {
    console.log("Handle the route /User ")
    next();
  },
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    // res.send("Handle Response 1")
    next();
  },
  (req, res) => {
    res.send("Handle Response 2");
  }
);

//! Auth Middleware-----------------------------------------------------------------------------------------------------------------
const { authAdmin, userAuth } = require("./middleware/auth");

app.use("/admin", authAdmin);

app.get("/admin/getAllData", (req, res) => {
  res.send("Admin getAllData!!! ");
});

app.get("/admin/deleteAllData", (req, res) => {
  res.send("Admin Deleted All Data!!!");
});

app.post("/user/login",(req,res) => {
  res.send("User Logged in successfully !!!")
})
app.get("/user" , userAuth , (req,res) =>{
  res.send("User Data sent!!!")
})

//! Error Handling--------------------------------------------------------------------------------------------------------------------

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong agaim");
  }
});

app.get("/getUserData", (req, res) => {
//  try {
    //DB logic and user data
    throw new Error("wasdfghjkl");
    //! this for throwing the error intentionally.
  // } 
  // catch (error) {
  //   res.status(500).send("Something went Worng !");
  // }
});

//! here when the try and catch is not there as comment out here the error will come and this will be catch in the if err condition and it will be handled by this. without it it will have thrown the error without handling.
// most important thing here is that order matters a lot here.
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong again");
  }
});