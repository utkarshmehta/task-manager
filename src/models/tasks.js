const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const tasks = mongoose.model("tasks", userSchema);
module.exports = tasks;
