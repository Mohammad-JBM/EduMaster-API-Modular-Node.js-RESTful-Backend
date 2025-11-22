// MongoDB
const mongoose = require("mongoose");

// Schema
const schema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    max: {
        type: Number, // => 1
        required: true
    },
    uses: {
        type: Number,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

// Model
const model = mongoose.model("Off", schema)


// Export
module.exports = model