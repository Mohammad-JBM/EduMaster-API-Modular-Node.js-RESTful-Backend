// Express
const express = require("express");
// Router
const router = express.Router();
// Conroller
const articleController = require("./../../controllers/v1/article");
// Middlewares
const authMiddleware = require("./../../middleware/auth");
const isAdminMiddleware = require("./../../middleware/isAdmin");
// Multer
const multer = require("multer");
const multerStorage = require("./../../utils/uploader");


// Routes
// GetAll & Create
router
    .route("/")
    .get(articleController.getAll)
    .post(
        authMiddleware,
        isAdminMiddleware,
        multer({ storage: multerStorage, limits: { fileSize: 1024 * 1024 * 5 } }).single("cover"),
        articleController.create
    );

// GetOne
router
    .route("/:href")
    .get(articleController.getOne)

// Remove
router
    .route("/:id")
    .delete(authMiddleware, isAdminMiddleware, articleController.remove)


// Draft
router
    .route("/draft")
    .post(
        authMiddleware,
        isAdminMiddleware,
        multer({ storage: multerStorage, limits: { fileSize: 1024 * 1024 * 5 } }).single("cover"),
        articleController.saveDraft
    );

// Export
module.exports = router