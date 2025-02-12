const express = require('express');
const router = express.Router();
const userControllers = require("../Controllers/userController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");



router.get("/getUsers", protect, adminOnly, userControllers.getAllUsers);
router.post("/createUsers", userControllers.createMultipleUsers);
router.get("/getUsersById", userControllers.getUserById);
router.put("/update/:userId", protect, userControllers.updateUser);
router.post("/deleteUsers", protect, adminOnly, userControllers.deleteUser);

module.exports = router