// MogoDB
const mongoose = require("mongoose");


// Schema
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    publish: {
        type: Number, // 0 - 1
        required: true
    }
}, { timestamps: true });


// Model
const model = mongoose.model("Article", schema);


// Export
module.exports = model;