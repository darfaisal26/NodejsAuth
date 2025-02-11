const User = require('../Models/userModel')


exports.signup = async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to create user',
        error: error.message
      });
        console.log(req.body)
    }
};
  

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
          users,
          message:'Fetched Successfully'
      },
    });
  } catch (error) {
    // console.error("❌ Get Users Error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

  