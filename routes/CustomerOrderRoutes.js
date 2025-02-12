const express = require('express');
const router = express.Router();
const CustomerController = require("../Controllers/CustomerControllers");
const OrderController = require("../Controllers/OrderControllers");


router.post("/createCustomer", CustomerController.createCustomer);

router.post("/orders", OrderController.createOrder);
router.get("/orders", OrderController.getAllOrders);
router.get("/orders/:id", OrderController.getOrderById);
router.put("/orders/:id", OrderController.updateOrder);
router.delete("/orders/:id", OrderController.deleteOrder);

module.exports = router