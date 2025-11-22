// Express
const express = require("express");
// Router
const router = express.Router();
// UserController
const ticketController = require("./../../controllers/v1/ticket");
// AuthMiddleware
const authMiddleware = require("./../../middleware/auth")
// isAdmin Middleware
const isAdminMiddleware = require("./../../middleware/isAdmin");


// All Routes

// Create & Get
router
    .route("/")
    .post(authMiddleware, ticketController.create)
    .get(authMiddleware, isAdminMiddleware, ticketController.getAll)


// Get User Tickets
router
    .route("/user")
    .get(authMiddleware, ticketController.userTickets)


// Get & Create Department & Department-sub
router
    .route("/department")
    .get(ticketController.department)
    .post(authMiddleware, isAdminMiddleware, ticketController.createDepartment)


router
    .route("/department/:id/subs")
    .get(ticketController.departmentSub)



router
    .route("/department-sub")
    .post(authMiddleware, isAdminMiddleware, ticketController.createDepartmentSub)

// Answer Ticket
router
    .route("/:id/answer")
    .get(authMiddleware, ticketController.getAnswer)

router
    .route("/answer")
    .post(authMiddleware, isAdminMiddleware, ticketController.setAnswer)







// Export
module.exports = router;