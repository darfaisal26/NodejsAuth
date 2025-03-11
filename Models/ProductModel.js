const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Category = require("./productCategoryModel");

const Product = sequelize.define("Product", {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "category_id",
    },
  },
});

module.exports = Product;
