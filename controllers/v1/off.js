// Model
const offModel = require("./../../models/off");
const coursesModel = require("./../../models/course");
// MongoDB
const mongoose = require("mongoose");


// All Controller
// Get All
exports.getAll = async (req, res) => {
    const offs = await offModel
        .find({}, "-__v")
        .populate("course", "name href")
        .populate("creator", "name");

    return res.status(200).json(offs);
}

// Create
exports.create = async (req, res) => {
    const { code, percent, course, max } = req.body;
    const newOff = await offModel.create({ code, percent, course, max, uses: 0, creator: req.user._id });
    return res.status(201).json(newOff);
}

// SetOnAll
exports.setOnAll = async (req, res) => {
    const { discount } = req.body;
    const coursesDiscount = await coursesModel.updateMany({}, { discount });
    return res.status(202).json({
        message: "Discount Set Successfully :)"
    });
}

// Getone
exports.getOne = async (req, res) => {
    const { code } = req.params;
    const { course } = req.body;
    const isValidID = mongoose.Types.ObjectId.isValid(course);

    if (!isValidID) {
        return res.status(403).json({ message: "Course Id Is Not Valid!!" })
    }

    const off = await offModel.findOne({ code, course });

    if (!off) {
        return res.status(404).json({
            message: "Off Code is Not Valid!!"
        })
    } else if (off.max == off.uses) {
        return res.status(409).json({ message: "This Code Already Used!!" })
    } else {
        await offModel.findOneAndUpdate({ code, course }, { uses: off.uses + 1 })
        return res.status(200).json(off);
    }
}

// Remove
exports.remove = async (req, res) => {
    const { id } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
        return res.status(403).json({
            message: "Your ID Is Not Valid !!"
        })
    }

    const removedOff = await offModel.findByIdAndDelete({ _id: id });

    if (!removedOff) {
        return res.status(404).json({
            message: "Off Not Found!!"
        });
    };

    return res.status(200).json(removedOff);
}