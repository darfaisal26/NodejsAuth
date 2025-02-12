const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
        message: "Retrieved Successfully",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const id = req.query.id;
    // console.log({ id });
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
        message: "User retrieved successfully",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};


exports.signup = async (req, res) => {
  try {
    const { name, email, photo, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      photo,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || "your_default_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    newUser.password = undefined;

    res.status(201).json({
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return next(new AppError("User does not exist.", 400));
    }

    // console.log("Stored Hash:", existingUser.password);
    // console.log("Entered Password:", password);

    // Correct way to use bcrypt.compare with async/await
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    // console.log("Password Match:", isPasswordValid);

    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = jwt.sign(
      { id: existingUser.id },
      process.env.JWT_SECRET || "default_Secret",
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        photo: existingUser.photo,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return next(new AppError("Something went wrong", 500));
  }
};

exports.CreateMultipleUsers = async (req, res) => {
  try {
    let users = req.body;

    if (!Array.isArray(users)) {
      return res
        .status(400)
        .json({ message: "Invalid data format. Expected an array." });
    }

    const existingEmails = await User.findAll({
      where: { email: users.map((user) => user.email) },
      attributes: ["email"],
    });

    const existingEmailSet = new Set(existingEmails.map((user) => user.email));

    users = users.filter((user) => !existingEmailSet.has(user.email));

    if (users.length === 0) {
      return res
        .status(400)
        .json({ message: "All provided emails already exist." });
    }

    for (const user of users) {
      if (!user.password || user.password !== user.confirmPassword) {
        return res
          .status(400)
          .json({ message: `Passwords do not match for ${user.email}` });
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
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
