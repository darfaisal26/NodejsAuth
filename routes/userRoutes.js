const express = require('express');
const router = express.Router();
const authControllers = require('../Controllers/authControllers');


router.post('/signup', authControllers.signup);
router.get('/users', authControllers.getAllUsers);

module.exports = router