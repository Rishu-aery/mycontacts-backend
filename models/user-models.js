const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add your username"]
        },
        email: {
            type: String,
            required: [true, "Please add your email"],
            unique: [true, "Email already exist"],
        },
        password: {
            type: String,
            required: [true, "Please add your password"],
        },
    },
    {
        timeStamp: true,
    }
);

module.exports = mongoose.model("User", userSchema);