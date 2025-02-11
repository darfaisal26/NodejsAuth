const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    required: [true, "Please provide your email"],
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: [true, "Please provide a password"],
    minLength: 8,
  },
  confirmPassword: {
    type: DataTypes.STRING,
    allowNull: false,
    required: [true, "Please provide a password"],
    minLength: 8,
    validate: {
      isEqual(value) {
        if (value !== this.password) {
          throw new Error("Passwords do not match!");
        }
      },
    },
  }
});

module.exports = User;
