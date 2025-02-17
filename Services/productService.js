const Product = require('../Models')

const getAllProducts = async (filters) => {
  const { category, size, minPrice, maxPrice } = filters;
  const products = await Product.findAll({
    where: {
      ...(category && { category_id: category }),
      ...(size && { size: size }),
      ...(minPrice && maxPrice && {
        price: { [Op.between]: [minPrice, maxPrice] },
      }),
    },
  });
  return products;
};

const getProductDetails = async (productId) => {
  const product = await Product.findByPk(productId);
  return product;
};

module.exports = { getAllProducts, getProductDetails };
