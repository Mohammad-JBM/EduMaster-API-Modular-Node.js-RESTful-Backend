// Express
const express = require("express");
// Controller
const newsletterController = require("./../../controllers/v1/newsletter");
// Middlewares
const authMiddleware = require("./../../middleware/auth");
const isAdminMiddleware = require("./../../middleware/isAdmin");

// Router
const router = express.Router();


// All Route

// register
router
    .route("/")
    .get(authMiddleware, isAdminMiddleware, newsletterController.getAll)
    .post(newsletterController.register)



// Export
module.exports = router;