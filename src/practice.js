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


//! API handler


//Finding the user based on email condition.
app.get("/feed", async (req, res) => {
  z;
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    console.error("Something went wrong!!!");
  }
});
// finding all the user in the query DB.
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User not found!!!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});

// finding the one user in the data database

app.get("/one", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.findOne({ email: userEmail });
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});

// delete a user------------------------------------------------
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send("User has been deleted!!!");
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});

// update a user-- and validation on the Give API for the selective field can be updated.

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  // whole data given in the body of postman will be extracted here.
  const data = req.body;

  // making AllowedUser API Validation

  try {
    const Allowed_User = [
      "firstName",
      "age",
      "gender",
      "skills",
      "about",
      "photoURL",
    ];

    const isAllowed = Object.keys(data).every((k) => Allowed_User.includes(k));
    // every check the statement and return the true or false. it work on arrays

    if (!isAllowed) {
      throw new Error("Updating  not allowed");
    }

    // skills valifation for it has only 5 skills
    if (data.skills.length > 10) {
      throw new Error("The skills should be not be more than 10");
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(updatedUser);
    res.send("User's data has been updated!!!");
  } catch (err) {
    res.status(400).send("UPDATE FAILED : " + err.message);
  }
});

