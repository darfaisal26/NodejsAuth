const express = require('express');
const router = express.Router();
const authControllers = require("../Controllers/authControllers");

const { protect } = require("../middlewares/authMiddleware");

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.put("/change-password/:userId", protect, authControllers.changePassword);
router.post("/reset-password/:token", authControllers.resetPassword);
router.post("/forgot-password", authControllers.forgotPassword);