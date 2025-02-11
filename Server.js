require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize, connectToDB } = require("./Config/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", require("./routes/userRoutes"));

const initializeServer = async () => {
  try {
    await connectToDB();
    await sequelize.sync({ force: false });
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error initializing server:", error);
  }
};

initializeServer();
