const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength : 4,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase : true,
    trim : true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
    min : 18,
    max : 50,
  },
  gender: {
    type: String,
  },
  photoURL: {
    type: String,
  },
  about: {
    type: String,
    default: "This is the default value of user",
  },
  skills: {
    type: [String], // it will require a sting of arrays thats why we've given it the array.
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
