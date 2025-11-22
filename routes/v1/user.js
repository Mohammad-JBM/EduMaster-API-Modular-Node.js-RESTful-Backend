const express = require("express");
// UserController
const userController = require("./../../controllers/v1/user");
// AuthMiddleware
const authMiddleware = require("./../../middleware/auth")
// isAdmin Middleware
const isAdmin = require("./../../middleware/isAdmin");
const auth = require("./../../middleware/auth");

// Router
const router = express.Router();

// Remove User
router.delete("/:id", auth, isAdmin, userController.removeUser);

// Ban
router.post("/ban/:id", authMiddleware, isAdmin, userController.banUser);

// Change Role
router.put("/role", authMiddleware, isAdmin, userController.changeRole);

// GetAll | UpdateUser
router
    .route("/")
    .get(auth, isAdmin, userController.getAll)
    .put(auth, userController.updateUser)





module.exports = router;