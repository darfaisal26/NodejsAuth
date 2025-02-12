const userService = require("../Services/userService");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users, message: "Retrieved Successfully" },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.query.id;
    const user = await userService.getUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      data: { user, message: "User retrieved successfully" },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, photo } = req.body;
    const { userId } = req.params;

    if (!name && !email) {
      return res
        .status(400)
        .json({ message: "At least one field is required for update." });
    }

    const user = await userService.updateUser(userId, { name, email, photo });

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.query.id;
    const deleted = await userService.deleteUser(userId);

    if (!deleted) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const createMultipleUsers = async (req, res) => {
  try {
    const users = req.body;
    const { newUsers, tokens } = await userService.createMultipleUsers(users);

    res.status(201).json({
      message: "Users created successfully",
      users: newUsers.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })),
      tokens,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createMultipleUsers,
};