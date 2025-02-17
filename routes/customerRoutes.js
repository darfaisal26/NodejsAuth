const express = require('express');

const router = express.Router();

const CustomerController = require("../Controllers/CustomerControllers");

router.post("/customer", CustomerController.createCustomers);

module.exports = router;