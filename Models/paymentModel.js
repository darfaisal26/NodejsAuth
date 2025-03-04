const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Order = require("./ordersModel");

const Payment = sequelize.define("Payment", {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: "order_id",
    },
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
  payment_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Payment;
