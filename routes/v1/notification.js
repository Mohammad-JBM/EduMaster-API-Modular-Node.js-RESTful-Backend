// Express
const express = require("express");
// Controller
const notificationController = require("./../../controllers/v1/notification");
// Router
const router = express.Router();
// Middlewares
const authMiddleware = require("./../../middleware/auth");
const isAdminMiddleware = require("./../../middleware/isAdmin");


// All Route

// Create
router
    .route("/")
    .post(authMiddleware, isAdminMiddleware, notificationController.create)
    .get(authMiddleware, isAdminMiddleware, notificationController.getAll)


// Remove
router
    .route("/:id")
    .delete(authMiddleware, isAdminMiddleware, notificationController.remove)


// Get
router
    .route("/my-notifications")
    .get(authMiddleware, isAdminMiddleware, notificationController.get)

// Seen
router
    .route("/:id/see")
    .put(authMiddleware, isAdminMiddleware, notificationController.see)


// Export
module.exports = router;