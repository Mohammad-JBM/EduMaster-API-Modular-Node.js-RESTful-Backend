// MongoDB
const mongoose = require("mongoose");

//  Schema
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Menu",
        required: false
    }
}, { timestamps: true });

// Model
const model = mongoose.model("Menu", schema);

// Export
module.exports = model;