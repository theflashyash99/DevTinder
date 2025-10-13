const express = require("express");
const authRouter =  express.Router();

authRouter.post("/signup", async (req, res) => {
  //creating a new instance of User model.
  //----------------------Manual & Hard-coded data passing
  // const user = new User({
  //   firstName: "Rashid ",
  //   lastName: "Ali",
  //   email: "Rashid@gmail.com",
  //   password: "123456789",
  //   age: 21,
  // });
  //------------------------------The Dyanamic data transfer---------------------------------------------------------------
  //creating a new instance of User model.... ....
  try {
    //validation check function.
    const { firstName, lastName, age, email, password, about, photoURL } =
      req.body;
    validationSignUpData(req);

    // password encryption using bcrypt.hash(value,level of strong encryption 10 is recommanded)

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      age,
      email,
      password: passwordHash,
      about,
      photoURL,
    });

    await user.save();
    res.send("User added successfuly");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});


module.export = authRouter;

