// Express
const express = require("express");
// Router
const router = express.Router();
// UserController
const menusController = require("./../../controllers/v1/menu");
// AuthMiddleware
const authMiddleware = require("./../../middleware/auth")
// isAdmin Middleware
const isAdminMiddleware = require("./../../middleware/isAdmin");

// Routers

// Create & GetAll
router
    .route("/")
    .get(menusController.getAll)
    .post(authMiddleware, isAdminMiddleware, menusController.create);


// Get All
router
    .route("/all")
    .get(authMiddleware, isAdminMiddleware, menusController.getAllInPanel);


// Delete
router
    .route("/:id")
    .delete(authMiddleware, isAdminMiddleware, menusController.remove)
    .put(authMiddleware, isAdminMiddleware, menusController.update);

// Exprot
module.exports = router