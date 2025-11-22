// Mongoose
const mongoose = require("mongoose");

// Schema
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    }
});

// Model
const model = mongoose.model("Category", schema);
// Export Module
module.exports = model;