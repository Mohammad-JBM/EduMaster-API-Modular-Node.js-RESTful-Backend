// Model
const articleModel = require("./../../models/article");
// MongoDB
const mongoose = require("mongoose");


// Controllers

// Create
exports.create = async (req, res) => {
    try {
        const { title, description, body, href, categoryID } = req.body;

        const article = await articleModel.create({
            title, description, body, href, categoryID, creator: req.user._id, cover: req.file?.filename, publish: 1
        });

        return res.status(201).json(article);

    } catch (err) {
        return res.status(400).json({
            message: "Validation error",
            error: err.message
        });
    }
};

// GetAll
exports.getAll = async (req, res) => {
    const articles = await articleModel
        .find({ publish: 1 }, "-__v")
        .populate("categoryID", "title")
        .populate("creator", "name");


    return res.status(200).json(articles);
}

// GetOne
exports.getOne = async (req, res) => {
    const { href } = req.params;
    const article = await articleModel
        .findOne({ href }, "-__v")
        .populate("categoryID", "title")
        .populate("creator", "name");

    if (!article) {
        return res.status(404).json({
            message: "This Article Is Not Found !!"
        })
    } else if (article.publish == 0) {
        return res.status(409).json({
            message: "This Article Is Not Accessable Now!"
        })
    }

    return res.status(200).json(article)
}

// Remove
exports.remove = async (req, res) => {
    const { id } = req.params;
    const isValidID = mongoose.Types.ObjectId.isValid(id);
    if (!isValidID) {
        return res.status(403).json({ message: "Article ID Is Not Valid !!" })
    };
    const removedArticle = await articleModel.findByIdAndDelete({ _id: id });
    if (!removedArticle) {
        return res.status(404).json({
            message: "Article Not Found !!"
        })
    };
    return res.status(200).json(removedArticle);
}

// SaveDraft
exports.saveDraft = async (req, res) => {
    const { title, description, body, href, categoryID } = req.body;
    const article = await articleModel.create({ title, description, body, href, categoryID, creator: req.user._id, cover: req.file.filename, publish: 0 });

    return res.status(201).json(article);
}