// MongoDB
const mongoose = require("mongoose");


// Schema
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
        required: true
    }
}, { timestamps: true });


// Model
const model = mongoose.model("DepartmentSub", schema);


// Export
module.exports = model;