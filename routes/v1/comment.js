// Express
const express = require("express");
// Router
const router = express.Router();
// AuthMiddleware
const authMiddleware = require("./../../middleware/auth");
// isAdmin Middleware
const isAdminMiddleware = require("./../../middleware/isAdmin");
// Comment Controller
const commentsController = require("./../../controllers/v1/comment")


// Create && Get Comment
router
    .route("/")
    .post(authMiddleware, commentsController.create)
    .get(authMiddleware, isAdminMiddleware, commentsController.getAll)

// Delete Comments
router
    .route("/:id")
    .delete(authMiddleware, isAdminMiddleware, commentsController.remove)

// Accept Comments
router
    .route("/:id/accept")
    .put(authMiddleware, isAdminMiddleware, commentsController.accept)


// Reject Comments
router
    .route("/:id/reject")
    .put(authMiddleware, isAdminMiddleware, commentsController.reject)

// Answer Comments
router
    .route("/:id/answer")
    .post(authMiddleware, isAdminMiddleware, commentsController.answer)

// Exports
module.exports = router