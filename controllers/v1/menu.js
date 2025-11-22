// Model
const menusModel = require("./../../models/menu");
// MongoDB
const mongoose = require("mongoose");

// Controller
// GetAll
exports.getAll = async (req, res) => {
    const menus = await menusModel.find({}).lean();
    const finalMenus = menus
        .filter(m => !m.parent)
        .map(menu => ({
            ...menu,
            subMenus: menus
                .filter(s => String(s.parent) == String(menu._id))
                .map(subMenu => ({
                    ...subMenu
                }))
        }))
    return res.status(200).json(finalMenus)
}

// Create
exports.create = async (req, res) => {
    const { title, href, parent } = req.body;
    const isValidID = mongoose.Types.ObjectId.isValid(parent);
    if (!parent == null) {
        if (!isValidID) {
            return res.status(403).json({
                message: "Your ID Is Not Valid!!",
            })
        }
    };

    const menu = await menusModel.create({
        title,
        href,
        parent
    });
    return res.status(201).json(menu);
}

// Get All In Panel
exports.getAllInPanel = async (req, res) => {
    const menus = await menusModel.find({}).populate("parent").lean();
    return res.status(200).json(menus);
}

// Remove
exports.remove = async (req, res) => {
    const { id } = req.params;
    const isValidID = mongoose.Types.ObjectId.isValid(id);

    if (!isValidID) {
        return res.status(403).json({
            message: "Your ID Is Not Valid!!"
        })
    };

    const removedMenu = await menusModel.findByIdAndDelete({ _id: id });

    if (!removedMenu) {
        return res.status(404).json({
            message: "Your Menu Not Found !!"
        })
    };
    return res.status(200).json(removedMenu);
}

// Update
exports.update = async (req, res) => {
    const { id } = req.params;
    const { title, href, parent } = req.body;
    const isValidID = mongoose.Types.ObjectId.isValid(id);

    if (!isValidID) {
        return res.status(403).json({
            message: "Your ID Is Not Valid!!"
        })
    }

    const updatedMenu = await menusModel.findByIdAndUpdate({ _id: id }, {
        title,
        href,
        parent
    });

    if (!updatedMenu) {
        return res.status(404).json({
            message: "Your Menu Not Found !!"
        })
    };

    return res.status(200).json(updatedMenu);
}