const mongoose = require("mongoose");

//instance of new schema made so use new.
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, 
    minLength: 4, // for string minlength
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true, // it will make sure every email is unique.
    lowercase: true, //  it will make string into lower case.
    trim: true, // it will remove white space.
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
    min: 18,
    max: 50,
  },
  gender: {
    type: String,
    //custom validation by validate function.
    validate(value){
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    },
  },
  photoURL: {
    type: String,
    default : "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
  },
  about: {
    type: String,
    default: "This is the default value of user",
  },
  skills: {
    type: [String], // it will require a sting of arrays thats why we've given it the array.
  },
  
},
{
    timestamps:true,
  });

const User = mongoose.model("User", userSchema);

module.exports = User;
