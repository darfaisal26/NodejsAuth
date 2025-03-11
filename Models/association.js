const Customer = require("./customerModel");
const Order = require("./ordersModel");
const Payment = require("./paymentModel");
const Product = require("./ProductModel");
const Category = require("./productCategoryModel");

Customer.hasMany(Order, { foreignKey: "customer_id" });
Order.belongsTo(Customer, { foreignKey: "customer_id" });

Customer.hasMany(Payment, { foreignKey: "customer_id" });
Payment.belongsTo(Customer, { foreignKey: "customer_id" });

Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

module.exports = { Customer, Order, Payment, Category, Product };
