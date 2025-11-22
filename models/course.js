// Mongoose
const mongoose = require("mongoose");

// Schema
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    support: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String, // complete - preSell - ...
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, 
{ timestamps: true });

// Session Virtual Relation
schema.virtual("Sessions", {
    ref: "Session",
    localField: "_id",
    foreignField: "course"
});
// Comment Virtual Relation
schema.virtual("Comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "course"
});


// Model
const model = mongoose.model("Course", schema);

// Export
module.exports = model;