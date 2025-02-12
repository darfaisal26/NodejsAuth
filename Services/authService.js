const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { Op } = require("sequelize");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "your_default_secret",
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
};

const signup = async (userData) => {
  const { name, email, photo, password, confirmPassword, role, active } = userData;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("Email already exists. Please use a different email.");

  if (password !== confirmPassword) throw new Error("Passwords do not match.");

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    name,
    email,
    photo,
    password: hashedPassword,
    role,
    active,
  });

  return { token: generateToken(newUser), user: newUser };
};

const login = async ({ email, password }) => {
  if (!email || !password) throw new Error("Please provide email and password.");

  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) throw new Error("User does not exist.");

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) throw new Error("Invalid email or password.");

  return { token: generateToken(existingUser), user: existingUser };
};

const changePassword = async (userId, { currentPassword, newPassword, confirmNewPassword }) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found.");

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error("Current password is incorrect.");

  if (newPassword !== confirmNewPassword) throw new Error("New passwords do not match.");

  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();

  return { message: "Password changed successfully" };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found.");

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetUrl = `http://localhost:5000/api/reset-password/${resetToken}`;
  await sendEmail({
    to: user.email,
    subject: "Password Reset Request",
    text: `Click the following link to reset your password: ${resetUrl}`,
  });

  return { message: "Password reset link sent!" };
};

const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!user) throw new Error("Invalid or expired token.");

  user.password = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return { message: "Password reset successfully!" };
};


module.exports = {signup, login, changePassword, forgotPassword, resetPassword};