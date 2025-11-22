// Model
const newsletterModel = require("./../../models/newsletter");
// MongoDB
const mongoose = require("mongoose");
// Nodemailer
const nodemailer = require("nodemailer");

// Create
exports.register = async (req, res) => {
    const email = req.body.email;
    const isEmailExist = await newsletterModel.findOne({ email });

    if (isEmailExist) {
        return res.status(409).json({
            message: "You are registerd Already!!"
        })
    };

    const register = await newsletterModel.create({ email });
    return res.status(201).json(register);
}


// Get All
exports.getAll = async (req, res) => {
    const newsletter = await newsletterModel.find({});
    return res.status(200).json(newsletter);
}