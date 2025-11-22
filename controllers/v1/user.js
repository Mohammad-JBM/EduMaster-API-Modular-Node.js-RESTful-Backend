// userModel
const userModel = require("./../../models/user");
// banPhone-Model
const banUserModel = require("./../../models/ban-phone");
const { default: mongoose } = require("mongoose");
// bcrypt
const bcrypt = require("bcrypt");

// BanUser
exports.banUser = async (req, res) => {
    const mainUser = await userModel.findOne({ _id: req.params.id }).lean();
    const banUserResult = banUserModel.create({ phone: mainUser.phone });

    if (banUserResult) {
        return res.status(200).json({ message: "user ban Successfully" });
    }

    return res.status(500).json({ message: "Server Error !" })
};

// GetAll
exports.getAll = async (req, res) => {
    const users = await userModel.find({}).select("-password -__v");

    return res.status(200).json(users);
}

// Remove User
exports.removeUser = async (req, res) => {
    // userId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        return res.status(409).json({
            message: "User Id Is Not Valid !!"
        })
    }
    // deleteUser By Id 
    const removeUser = await userModel.findByIdAndDelete({ _id: req.params.id });

    if (!removeUser) {
        return res.status(404).json({
            message: "User Not Found !!",
        });
    }

    return res.status(200).json({
        message: "User Removed Successfully"
    });
}

// Change Role
exports.changeRole = async (req, res) => {
    // userId
    const { id } = req.body;
    // validateID
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidObjectId) {
        return res.status(409).json({
            message: "User ID is Not Valid !",
        })
    }
    // find user
    const user = await userModel.findById({ _id: id });
    // New Role
    let newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

    // Set New Role
    const updateUser = await userModel.findByIdAndUpdate({ _id: id }, {
        role: newRole,
    });
    // response
    return res.status(200).json({
        message: "User Role Changed Successfully"
    })
}

// UpdateUser
exports.updateUser = async (req, res) => {
    // Body Data
    const { name, username, email, password, phone } = req.body;
    // password hashing
    const hashedPassword = await bcrypt.hash(password, 12);
    // FindUser & Update
    const user = await userModel.findByIdAndUpdate({ _id: req.user._id }, {
        name,
        username,
        email,
        password: hashedPassword,
        phone,
    })
        .select("-password -__v")
        .lean();

    // Response
    return res.status(200).json(user);
}