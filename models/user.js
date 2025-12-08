const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

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
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("The given password is not strong " + value);
        }
      },
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
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("The given URL is not Valid");
        }
      },
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

// creating the index on first and last name
userSchema.index({firstName:1, lastName:1});

userSchema.methods.getJWT = async function () {  // always use the function keyword to use this keyword..
  const user = this;
  // this is the user data as we model invoke it instantiated. so this means the user is store in the User so that it can easily me used.
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser){
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
   return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
