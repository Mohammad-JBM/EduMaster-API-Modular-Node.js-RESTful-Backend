// Express
const express = require("express");
// Router
const router = express.Router();
// Controller
const offController = require("../../controllers/v1/off");
// Middlewares
const authMiddleware = require("./../../middleware/auth");
const isAdminMiddleware = require("./../../middleware/isAdmin");

// All Routes
// Create & GetAll
router
    .route("/")
    .get(authMiddleware, isAdminMiddleware, offController.getAll)
    .post(authMiddleware, isAdminMiddleware, offController.create)

// Set On All
router
    .route("/all")
    .post(authMiddleware, isAdminMiddleware, offController.setOnAll)


// Get One
router
    .route("/:code")
    .post(authMiddleware, offController.getOne)



// Remove
router
    .route("/:id")
    .delete(authMiddleware, isAdminMiddleware, offController.remove)


    
// Export
module.exports = router;