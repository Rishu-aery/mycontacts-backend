const mongoose = require("mongoose");

contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            res: "User"
        },
        name: {
            type: String,
            required: [true, "Please add your name"]
        },
        email: {
            type: String,
            required: [true, "Please add your email"]
        },
        phone: {
            type: Number,
            required: [true, "Please add your phone number"]
        },
    },
    {
        timestamp: true,
    }
)

module.exports = mongoose.model("Contact", contactSchema);