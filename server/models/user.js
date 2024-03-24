const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: false,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        maxlength: 255,
    },
    quizzes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Quiz'
    }
});
const User = mongoose.model("Users", userSchema);
module.exports = User;