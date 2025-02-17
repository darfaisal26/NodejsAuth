const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController');

router.post('/payments', paymentController.createPayment);
router.get('/payments/:paymentId', paymentController.getPaymentStatus);

module.exports = router;
