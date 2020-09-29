const mongoose = require("mongoose");
const validator = require("validator");


const tasks = mongoose.model('tasks', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

module.exports = tasks