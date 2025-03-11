const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("NodeDB", "nodeuser", "admin@098", {
  // host: "DESKTOP-UPKIDK7\\SQLEXPRESS",
  host: "host.docker.internal", // ✅ Use this instead
  dialect: "mssql",
  port: 1433,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
});



async function connectToDB() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw error;
  }
}

module.exports = { sequelize, connectToDB };
