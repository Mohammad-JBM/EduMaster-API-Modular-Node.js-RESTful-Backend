// Course User
const courseUserModel = require("./../../models/course-user");
// MongoDB
const mongoose = require("mongoose");

// Controllers

// Get All
exports.getAll = async (req, res) => {
    const orders = await courseUserModel
        .find({ user: req.user._id })
        .populate("course", "name href")
        .lean();
    return res.status(200).json(orders)
}

// GetOne
exports.getOne = async (req, res) => {
    const { id } = req.params;
    const isValidID = mongoose.Types.ObjectId.isValid(id);

    if (!isValidID) {
        return res.status(403).json({
            message: "Order Id Is Not Valid"
        })
    }
    const order = await courseUserModel.findOne({ _id: id }).populate("course").lean();

    if (!order) {
        return res.status(404).json({
            message: "Order Is Not Found !!"
        })
    };

    return res.status(200).json(order);
}