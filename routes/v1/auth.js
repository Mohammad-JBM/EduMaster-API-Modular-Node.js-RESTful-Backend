const express = require("express");
// Auth Controller
const controller = require("./../../controllers/v1/auth");
// Express Router
const router = express.Router();
// Routers
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/me", controller.getMe);

// Register - Login - getMe
module.exports = router;

// Create Version For API
// http://localhost:3000/api/v1/register
// http://localhost:3000/api/v2/register
// http://localhost:3000/api/v3/register
