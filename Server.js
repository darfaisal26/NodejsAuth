require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { sequelize, connectToDB } = require("./Config/db");

const UserRoutes = require("./routes/userRoutes");
const OrderRoutes = require("./routes/orderRoutes");
const CustomerRoutes = require("./routes/customerRoutes");
const PaymentRoutes = require("./routes/paymentRoutes");
const ProductRoutes = require("./routes/productRoutes");
const AuthRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/customer", CustomerRoutes);
app.use("/api/payment", PaymentRoutes);
app.use("/api/product", ProductRoutes);

fs.writeFile("example.txt", "Hello, Node.js!", (err) => {
  if (err) throw err;
  console.log("File created and data written!");
});

console.log(path.basename("/Controllers/authControllers.js"));
console.log(path.dirname("/Controllers/authControllers.js"));
console.log(path.extname("/Controllers/authControllers.js"));


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
