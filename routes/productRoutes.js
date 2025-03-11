const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductDetails,
  updateOrCreateProduct,
} = require("../Controllers/productController");

router.get("/products", getAllProducts);
router.get("/products/:productId", getProductDetails);
router.post("/products/add", updateOrCreateProduct);


module.exports = router;
