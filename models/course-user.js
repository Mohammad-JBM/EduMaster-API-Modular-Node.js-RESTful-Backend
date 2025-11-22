// Mongoose
const mongoose = require("mongoose");

// Schema
const schema = mongoose.Schema({
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Model
const model = mongoose.model("CourseUser", schema);

// Export
module.exports = model