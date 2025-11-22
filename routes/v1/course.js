// Express
const express = require("express");
// Router
const router = express.Router();
// Course Controller
const coursesController = require("./../../controllers/v1/course")
// Multer
const multer = require("multer");
// MulterStorage
const multerStorage = require("./../../utils/uploader")
// authMiddleware
const authMiddleware = require("./../../middleware/auth");
// isAdmin Middleware
const isAdminMiddleware = require("./../../middleware/isAdmin");

// Create Course
router
    .route("/")
    .post(authMiddleware, isAdminMiddleware, multer({ storage: multerStorage, limits: { fileSize: 5 * 1024 * 1024 } }).single("cover"), coursesController.create)
    .get(authMiddleware, isAdminMiddleware, coursesController.getAll)
// Create Session
router
    .route("/:id/sessions")
    .post(
        authMiddleware,
        isAdminMiddleware,
        // multer({ storage: multerStorage, limits: { fileSize: 20 * 1024 * 1024 } }).single("video"),
        coursesController.createSession)

// GetAll Sessions
router
    .route("/sessions")
    .get(authMiddleware, isAdminMiddleware, coursesController.getAllSessions);


// Get Courses By Category
router
    .route("/category/:href")
    .get(coursesController.getCoursesByCategory)


// Related Course
router
    .route("/related/:href")
    .get(coursesController.getRelated)


// Get Session
router
    .route("/:href/:sessionID")
    .get(coursesController.getSessionInfo)



// Remove Sessions
router
    .route("/session/:id")
    .delete(authMiddleware, isAdminMiddleware, coursesController.removeSession)


// Popular Courses
router
    .route("/popular")
    .get(coursesController.popular)


// Presell Courses
router
    .route("/presell")
    .get(coursesController.presell)


// Course Register
router
    .route("/:id/register")
    .post(authMiddleware, coursesController.register)

// Get Course
router
    .route("/:href")
    .get(authMiddleware, coursesController.getOne)

// Delete Course
router
    .route("/:id")
    .delete(authMiddleware, isAdminMiddleware, coursesController.remove)

// Export
module.exports = router;