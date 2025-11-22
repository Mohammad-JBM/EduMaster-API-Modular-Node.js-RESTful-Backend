// Model
const departmentModel = require("./../../models/department");
const departmentSubModel = require("./../../models/department-sub");
const ticketModel = require("./../../models/ticket");
// MongoDB
const mongoose = require("mongoose");

// Controller

// Create
exports.create = async (req, res) => {
    const { departmentID, departmentSubID, priority, title, body, course, parent } = req.body;
    const createdTicket = await ticketModel.create({ departmentID, departmentSubID, priority, title, body, user: req.user._id, answer: 0, course, parent, isAnswer: 0 });
    const mainTicket = await ticketModel
        .findOne({ _id: createdTicket._id })
        .populate("departmentID")
        .populate("departmentSubID")
        .populate("course")
        .populate("user", "-password")
        .lean();
    return res.status(201).json(mainTicket);
}

// GetAll
exports.getAll = async (req, res) => {
    const tickets = await ticketModel
        .find({ answer: 0 })
        .populate("departmentID", "title")
        .populate("departmentSubID", "title")
        .populate("user", "name")
        .lean();
    return res.status(200).json(tickets)
}

// User Tickets
exports.userTickets = async (req, res) => {
    const tickets = await ticketModel
        .find({ user: req.user._id })
        .sort({ _id: -1 })
        .populate("departmentID", "title")
        .populate("departmentSubID", "title")
        .populate("user", "name");
    if (!tickets) {
        return res.status(404).json({
            message: "Your Ticket Not Found !!"
        })
    };
    return res.status(200).json(tickets);
}

// Department
exports.department = async (req, res) => {
    const departments = await departmentModel.find({}).lean();
    return res.status(200).json(departments)
}
// Department Create
exports.createDepartment = async (req, res) => {
    const { title } = req.body;
    const createdDepartment = await departmentModel.create({ title });
    res.status(201).json(createdDepartment);
}

// DepartmentSub
exports.departmentSub = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json({
            message: "Your ID Is Not Valid !!"
        })
    }
    const departmentSubs = await departmentSubModel.find({ parent: id }).lean;

    if (!departmentSubs) {
        return res.status(404).json({
            message: "Department Sub Not Found !!"
        })
    }

    return res.status(200).json(departmentSubs);
}

// DepartmentSub Create
exports.createDepartmentSub = async (req, res) => {
    const { title, parent } = req.body;
    const isValidID = mongoose.Types.ObjectId.isValid(parent);

    if (!isValidID) {
        return res.status(403).json({
            message: "Your Parent ID is Not Valid"
        })
    }

    const createdDepartmentSub = await departmentSubModel.create({ title, parent });
    return res.status(201).json(createdDepartmentSub);
}

// SetAnswer
exports.setAnswer = async (req, res) => {
    const { body, ticketID } = req.body;
    const isValidID = mongoose.Types.ObjectId.isValid(ticketID);

    if (!isValidID) {
        return res.status(403).json({
            message: "Your Ticket ID is Not Valid!!"
        })
    }

    const ticket = await ticketModel.findById({ _id: ticketID }).lean();

    if (!ticket) {
        return res.status(404).json({
            message: "Your Ticket Not Found !!"
        })
    }

    const answer = await ticketModel.create({
        title: "پاسخ تیکت شما",
        body,
        parent: ticket._id,
        priority: ticket.priority,
        user: req.user._id,
        isAnswer: 1,
        answer: 0,
        departmentID: ticket.departmentID,
        departmentSubID: ticket.departmentSubID
    })
    await ticketModel.findByIdAndUpdate({ _id: ticketID }, { answer: 1 });
    return res.status(201).json(answer);
}

// GetAnswer
exports.getAnswer = async (req, res) => {
    const { id } = req.params;
    const ticket = await ticketModel.findById({ _id: id });
    const ticketAnswer = await ticketModel.findOne({ parent: id });

    return res.status(200).json({
        ticket,
        ticketAnswer: ticketAnswer ? ticketAnswer : null
    })
}