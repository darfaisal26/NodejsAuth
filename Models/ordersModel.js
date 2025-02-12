const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Customer = require("./customerModel");

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
      key: "customer_id",
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
});

module.exports = Order;
