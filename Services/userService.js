const  User  = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async () => {
  return await User.findAll();
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

const updateUser = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) return null;

  await user.update(updateData);
  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) return null;

  await user.destroy();
  return true;
};

const createMultipleUsers = async (users) => {
  if (!Array.isArray(users)) {
    throw new Error("Invalid data format. Expected an array.");
  }

  const existingEmails = await User.findAll({
    where: { email: users.map((user) => user.email) },
    attributes: ["email"],
  });

  const existingEmailSet = new Set(existingEmails.map((user) => user.email));

  users = users.filter((user) => !existingEmailSet.has(user.email));

  if (users.length === 0) {
    throw new Error("All provided emails already exist.");
  }

  for (const user of users) {
    if (!user.password || user.password !== user.confirmPassword) {
      throw new Error(`Passwords do not match for ${user.email}`);
    }
    user.password = await bcrypt.hash(user.password, 12);
    delete user.confirmPassword;
  }

  const newUsers = await User.bulkCreate(users, { returning: true });

  const tokens = newUsers.map((user) => ({
    email: user.email,
    token: jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "your_default_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    ),
  }));

  return { newUsers, tokens };
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createMultipleUsers,
};
