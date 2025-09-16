const mongoose = require("mongoose");
const validator = require("validator");
//instance of new schema made so use new.
const userSchema = new mongoose.Schema(
  {
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("The email is invalid");
        }
      },
    },
    password: {
      type: String,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error ("The given password is not strong " + value)
        }
      }
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    gender: {
      type: String,
      //custom validation by validate function.
      // value means that the given value in the field.
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoURL: {
      type: String,
      default:
        "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
        validate(value){
          if(!validator.isURL(value)){
            throw new Error ("The given URL is not Valid")

          }
        }
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
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
