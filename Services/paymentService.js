const { Payment } = require("../Models/association");
const { Order } = require("../Models/association");

const createPayment = async (paymentData) => {
  const { order_id, payment_method, payment_amount } = paymentData;

  const order = await Order.findByPk(order_id);
  if (!order) throw new Error("Order not found");

  const payment = await Payment.create({
    order_id,
    payment_method,
    payment_status: "Pending",
    payment_amount,
  });

  order.status = "Paid";
  await order.save();

  return payment;
};

const getPaymentStatus = async (paymentId) => {
  const payment = await Payment.findByPk(paymentId);
  return payment;
};

module.exports = { createPayment, getPaymentStatus };
