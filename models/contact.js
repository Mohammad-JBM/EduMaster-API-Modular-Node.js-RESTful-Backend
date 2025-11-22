// MongoDB Requirement
const mongoose = require("mongoose");

// Schema
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    answer: {
        type: Number, // 0 - 1
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Model
const model = mongoose.model("Contact", schema);


// Export Model
module.exports = model;