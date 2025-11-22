// MongoDB
const mongoose = require("mongoose");


// Schema
const schema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    seen: {
        type: Number, // 0 - 1
        default: 0,
    }
}, { timestamps: true })

// Model
const model = mongoose.model("Notification", schema);


// Export
module.exports = model