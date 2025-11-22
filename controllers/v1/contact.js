// Contact Model
const contactsModel = require("./../../models/contact");
// MongoDB
const mongoose = require("mongoose");
// Nodemailer
const nodemailer = require("nodemailer");
// .env
require("dotenv").config();

// GetAll
exports.getAll = async (req, res) => {
    const allContacts = await contactsModel.find({}).select("-__v").lean();
    res.status(200).json(allContacts);
}
// Create
exports.create = async (req, res) => {
    const { name, email, phone, body } = req.body;

    const contact = await contactsModel.create({ name, email, phone, body, answer: 0 });

    return res.status(201).json(contact)
}
// Remove Contact
exports.remove = async (req, res) => {
    const contactID = req.params.id;
    const isValidID = mongoose.Types.ObjectId.isValid(contactID);
    if (!isValidID) {
        return res.status(403).json({
            message: "This ID is Not Valid !!"
        })
    };

    const removedContact = await contactsModel.findByIdAndDelete({ _id: contactID }).select("-__v");

    if (!removedContact) {
        return res.status(404).json({
            message: "Contact Not Found !!"
        })
    }

    return res.status(200).json(removedContact);
}
// Answer Contact
exports.answer = async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.AUTH_USER,
            pass: process.env.AUTH_PASS
        }
    })

    const mailOptions = {
        from: process.env.AUTH_USER,
        to: req.body.email,
        subject: "پاسخ شما از سمت Mohammad JBM",
        text: req.body.answer
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            return res.json({
                message: error
            })
        } else {
            const contact = await contactsModel.findOneAndUpdate({ email: req.body.email }, { answer: 1 });
            return res.json({
                message: "Email Send Successfully :)",
                contact
            })
        }
    })
}

