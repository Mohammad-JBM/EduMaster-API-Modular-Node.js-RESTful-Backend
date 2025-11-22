// CategoryModel
const { default: mongoose } = require("mongoose");
const categoryModel = require("./../../models/category");

// create
exports.create = async (req, res) => {
    const { title, href } = req.body;
    const category = await categoryModel.create({ title, href });

    return res.status(201).json(category);
}

// GetAll
exports.getAll = async (req, res) => {
    const category = await categoryModel.find({}).lean();
    return res.status(200).json(category);
}

// Remove Category
exports.remove = async (req, res) => {
    // CategoryId
    const { id } = req.params.id;
    // Id Validation
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
        return res.status(409).json({
            message: "Catagory is Not Valid !",
        });
    }
    // ID existence validation
    const isCategoryExist = await categoryModel.findById(id);
    if (!isCategoryExist) {
        return res.status(401).json({
            message: "This Category Is Not Exist !"
        })
    }
    // Remove Category
    const removedCategory = await categoryModel.findByIdAndDelete(id).select("-__v");
    res.status(200).json({
        removedCategory,
        message: "Category Removed Successfully"
    });
}

// Update Category
exports.update = async (req, res) => {
    // CategoryId
    const categoryId = req.params.id;
    // Category Data
    const { title, href } = req.body;
    // ID Validation
    const isValidId = mongoose.Types.ObjectId.isValid(categoryId);
    if (!isValidId) {
        return res.status(401).json({
            message: "Catagory is Not Valid !",
        });
    }
    // ID existence validation
    const isCategoryExist = await categoryModel.findById(categoryId);
    if (!isCategoryExist) {
        return res.status(401).json({
            message: "This Category Is Not Exist !"
        })
    }

    // Update Category
    const updatedCategory = await categoryModel.findByIdAndUpdate(categoryId, {
        title,
        href
    });
    return res.status(200).json({
        updatedCategory,
        message: "Category Updated Successfully"
    });
}