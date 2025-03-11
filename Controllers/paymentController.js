const paymentService = require("../Services/paymentService");

const createPayment = async (req, res) => {
  try {
    const payment = await paymentService.createPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error processing payment" });
  }
};

const getPaymentStatus = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentStatus(req.params.paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment status" });
  }
};

module.exports = { createPayment, getPaymentStatus };
