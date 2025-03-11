const { Op } = require("sequelize");
const Product = require("../Models/ProductModel");

const getAllProducts = async (filters) => {
  const { category, size, minPrice, maxPrice } = filters;
  return await Product.findAll({
    where: {
      ...(category && { category_id: category }),
      ...(size && { size }),
      ...(minPrice &&
        maxPrice && { price: { [Op.between]: [minPrice, maxPrice] } }),
    },
  });
};

const getProductDetails = async (productId) => {
  return await Product.findByPk(productId);
};

const updateOrCreateProduct = async (productData) => {
  const { product_id, ...updateData } = productData;

  const product = await Product.findByPk(product_id);
  if (product) {
    await product.update(updateData);
    return product;
  } else {
    return await Product.create(productData);
  }
};

const deleteProduct = async (productId) => {
  const product = await Product.findByPk(productId);
  if (!product) return false;

  await product.destroy();
  return true;
};

module.exports = {
  getAllProducts,
  getProductDetails,
  updateOrCreateProduct,
  deleteProduct,
};
