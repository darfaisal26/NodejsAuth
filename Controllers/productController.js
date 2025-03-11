const productService = require("../Services/productService");

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const product = await productService.getProductDetails(
      req.params.productId
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product details" });
  }
};

const updateOrCreateProduct = async (req, res) => {
  try {
    const {
      product_id,
      name,
      description,
      price,
      size,
      stock_quantity,
      category_id,
    } = req.body;

    const updatedProduct = await productService.updateOrCreateProduct({
      product_id,
      name,
      description,
      price,
      size,
      stock_quantity,
      category_id,
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating/creating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.productId);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = {
  getAllProducts,
  getProductDetails,
  updateOrCreateProduct,
  deleteProduct,
};
