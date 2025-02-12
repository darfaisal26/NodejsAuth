const { Customer } = require("../Models/association");
const findCustomerByEmail = async (email) => {
  return await Customer.findOne({ where: { email } });
};

const createCustomers = async (name, email) => {
  return await Customer.create({ name, email });
};

module.exports = {
  findCustomerByEmail,
  createCustomers,
};
