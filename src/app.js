const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("../models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {

  console.log(req.body);
  //creating a new instance of User model.
  //----------------------Manual & Hard-coded data passing
    // const user = new User({
    //   firstName: "Rashid ",
    //   lastName: "Ali",
    //   email: "Rashid@gmail.com",
    //   password: "123456789",
    //   age: 21,
    // });

    //------------------------------The Dyanamic data transfer---------------------------------------
    //creating a new instance of User model.
    const user = new User(req.body);
    try {
      await user.save();
      res.send("User added successfuly");
    } catch (err) {
      res.send("Problem with adding User:" + err.message);
    }
});

app.get("/feed",async(req,res)=>{
  const userEmail = req.body.email;
 try{
  const users =  await User.find({email : userEmail});
  if(users.length === 0 ){
    res.status(404).send("User not Found");
  }else{
    res.send(users)
  }
} catch(err){
  console.error("Something went wrong!!!");
}

})

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

//port and callback
