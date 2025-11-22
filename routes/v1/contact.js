// Express Requirement
const express = require("express");
const router = express.Router();
// Contact Controller
const contactsController = require("./../../controllers/v1/contact");
// Middleware
const authMiddleware = require("./../../middleware/auth");
const isAdminMiddleware = require("./../../middleware/isAdmin");


// Get All && Create
router
    .route("/")
    .get(authMiddleware, isAdminMiddleware, contactsController.getAll)
    .post(contactsController.create)


// Delete 
router
    .route("/:id")
    .delete(authMiddleware, isAdminMiddleware, contactsController.remove)


// Answer
router
    .route("/answer")
    .post(authMiddleware, isAdminMiddleware, contactsController.answer)


module.exports = router;