const { findCustomerByEmail,createCustomers } = require("../Services/customerService");

const createCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingCustomer = await findCustomerByEmail(email);
    if (existingCustomer) {
      return res.status(409).json({ message: "Customer already exists!" });
    }

    const customer = await createCustomers(name, email);

    res.status(201).json({
      message: "Customer created successfully!",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};







module.exports = { createCustomer};
