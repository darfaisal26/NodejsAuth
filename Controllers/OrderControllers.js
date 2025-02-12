const Order = require("../Models/ordersModel");
const Customer = require("../Models/customerModel");
const OrderService = require("../Services/orderService");

const createOrder = async (req, res) => {
    try {
        const { customer_id, order_amount } = req.body;
        console.log(req.body)
  
      const customer = await Customer.findByPk(customer_id);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
        const order = await OrderService.createOrder(customer_id, order_amount);
        
      res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      res.status(500).json({ message: "Error creating order", error: error.message });
    }
  };
  
  
  const getAllOrders = async (req, res) => {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
  };
  
  
  const getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order", error: error.message });
    }
  };
  
  
  const updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { order_amount } = req.body;
  
      const order = await OrderService.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      await OrderService.updateOrderById( order_amount);
      res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
      res.status(500).json({ message: "Error updating order", error: error.message });
    }
  };
  
  
  const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
  
      const order = await OrderService.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      await OrderService.deleteOrderById(id);
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting order", error: error.message });
    }
  };
  
  module.exports = { createOrder,getAllOrders,getOrderById,updateOrder,deleteOrder };