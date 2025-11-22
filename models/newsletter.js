// MongoDB
const mongoose = require("mongoose");


// Schema
const schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });


// Model
const model = mongoose.model("NewsLetter", schema);


// Export
module.exports = model