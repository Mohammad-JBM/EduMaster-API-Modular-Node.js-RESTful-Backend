// Model
const notificationModel = require("./../../models/notification");
// MongoDB
const mongoose = require("mongoose");


// Controllers

// Create Notification
exports.create = async (req, res) => {
    const { message, admin } = req.body;
    // Validation
    const notification = await notificationModel.create({ message, admin });
    return res.status(201).json(notification);
}

// GetAll
exports.getAll = async (req, res) => {
    const notifications = await notificationModel
        .find({})
        .populate("admin", "-password");

    return res.status(200).json(notifications);
}

// Remove
exports.remove = async (req, res) => {
    const { id } = req.params;
    const isValidID = mongoose.Types.ObjectId.isValid(id);

    if (!isValidID) {
        return res.status(403).json({
            message: "Your ID is not Valid"
        })
    };

    const removedNotification = await notificationModel.findByIdAndDelete({ _id: id });

    if (!removedNotification) {
        return res.status(404).json({
            message: "Notification Not Found !!"
        })
    };

    return res.status(200).json(removedNotification);
}

// Get Notifications
exports.get = async (req, res) => {
    const { _id } = req.user;
    const myNotifications = await notificationModel.find({ admin: _id });

    return res.status(200).json(myNotifications);
}

// Seen Notification
exports.see = async (req, res) => {
    const { id } = req.params;
    const isValidID = mongoose.Types.ObjectId.isValid(id);

    if (!isValidID) {
        return res.status(403).json({
            message: "Your ID is not Valid"
        })
    };

    const notification = await notificationModel.findByIdAndUpdate({ _id: id }, { seen: 1 });
    return res.status(200).json(notification);
}