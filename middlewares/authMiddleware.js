const jwt = require("jsonwebtoken");
const  User  = require("../Models/userModel");

exports.protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

      token = token.split(" ")[1];
    //   console.log(token, 'here')
    //   console.log(process.env.JWT_SECRET )

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_default_secret");
    //   console.log(decoded,'decoded')


      const user = await User.findOne({ where: { id: decoded?.id } });
    //   console.log(user,'user')

    if (!user) {
      return res.status(401).json({ message: "User not found. Unauthorized access." });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." , error:error.message});
  }
};

exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin" || !req.user.active) {
    return res.status(403).json({ message: "Access denied. Admin privileges required." });
  }
  next();
};
