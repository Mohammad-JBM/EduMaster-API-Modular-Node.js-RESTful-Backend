// Mongoose
const mongoose = require("mongoose");

// Schema
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    free: {
        type: Number, // 0 is free & 1 is not free
        required: true
    },
    video: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course"
    }
}, { timestamps: true });

// Create Mongoose Model
const model = mongoose.model("Session", schema);

// Export To Use
module.exports = model;