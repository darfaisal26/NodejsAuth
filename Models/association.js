const Customer = require("./customerModel");
const Order = require("./ordersModel");
const Payment = require("./paymentModel");

Customer.hasMany(Order, { foreignKey: "customer_id" });
Order.belongsTo(Customer, { foreignKey: "customer_id" });

Customer.hasMany(Payment, { foreignKey: "customer_id" });
Payment.belongsTo(Customer, { foreignKey: "customer_id" });

module.exports = { Customer, Order, Payment };
