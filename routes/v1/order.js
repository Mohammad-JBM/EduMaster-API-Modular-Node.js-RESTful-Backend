// Express
const express = require("express");
// Router
const router = express.Router();
// Controller
const orderController = require("./../../controllers/v1/order");
// Middlewares
const authMiddleware = require("./../../middleware/auth");
const isAdminMiddleware = require("./../../middleware/isAdmin");

// All Routers

// GetAll
router.route("/").get(authMiddleware, orderController.getAll);

// GetOne
router.route("/:id").get(authMiddleware, orderController.getOne);

// Export
module.exports = router;