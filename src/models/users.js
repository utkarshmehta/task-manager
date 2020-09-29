const mongoose = require("mongoose");
const validator = require("validator");


const User = mongoose.model("User", {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(email) {
        if (!validator.isEmail(email)) {
          throw new Error("Invalid Email");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("age must be a positive number");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(password) {
        if (password.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain 'Password' ");
        }
      },
    },
  });





  
  module.exports = User;