const express = require('express');
const router = express.Router();
const authControllers = require("../Controllers/authControllers");
const userControllers = require("../Controllers/userController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.put("/change-password/:userId", protect, authControllers.changePassword);
router.post("/reset-password/:token", authControllers.resetPassword);
router.post("/forgot-password", authControllers.forgotPassword);

router.get("/getUsers", protect, adminOnly, userControllers.getAllUsers);
router.post("/createUsers", userControllers.createMultipleUsers);
router.get("/getUsersById", userControllers.getUserById);
router.put("/update/:userId", protect, userControllers.updateUser);
router.post("/deleteUsers", protect, adminOnly, userControllers.deleteUser);

module.exports = router