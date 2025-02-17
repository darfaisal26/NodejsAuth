const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Customer = require("./customerModel"); // Assuming you have a Customer model

const Order = sequelize.define("Order", {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Customer,
      key: "customer_id", // Assuming the primary key of the Customer table is 'customer_id'
    },
  },
  order_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending", // Default status as "Pending"
  },
});

// Defining relationships (associations)
Order.belongsTo(Customer, { foreignKey: "customer_id" });

module.exports = Order;
