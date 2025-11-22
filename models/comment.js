// Mongoose
const mongoose = require("mongoose");

// Schema
const schema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    isAccept: {
        type: Number, // 0 - 1
        default: 0,
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 5
    },
    isAnswer: {
        type: Number, // 0 - 1
        required: true
    },
    mainCommentID: {
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }
}, 
{ timestamps: true });

// Model
const model = mongoose.model("Comment", schema);

// Export
module.exports = model;