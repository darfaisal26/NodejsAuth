const express = require('express');
const router = express.Router();
const authControllers = require("../Controllers/authControllers");

router.post("/signup", authControllers.signup);
router.post("/create", authControllers.CreateMultipleUsers);
router.post("/login", authControllers.login);
router.get("/usersById", authControllers.getUserById);
router.get('/users', authControllers.getAllUsers);

module.exports = router