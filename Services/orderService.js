const { Order, Customer } = require("../Models/association");

const createOrder = async (customer_id,order_amount) => {
    return await  Order.create({ customer_id, order_amount })
  };

const getAllOrders = async () => {
  return await Order.findAll({
    include: [{ model: Customer, attributes: ["customer_id", "name"] }],
  });
};



const findOrderById = async (id) => {
  return await Order.findByPk(id, {
    include: [{ model: Customer, attributes: ["customer_id", "name"] }],
  });
};

const getOrderById = async (id) => {
  return await findOrderById(id);
};

const updateOrderById = async (order_amount) => {
  return await Order.update({ order_amount });
};

const deleteOrderById = async (id) => {
  return await Order.destroy(id);
};



module.exports = {
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById,
    createOrder
};

