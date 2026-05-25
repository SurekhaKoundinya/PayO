const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "mysecretkey");

    //  support both id and mo
    let user;

    if (decoded.id) {
      user = await User.findById(decoded.id);
    } else if (decoded.mobile) {
      user = await User.findOne({ mobile: decoded.mobile });
    } else {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.userId = user._id;
    req.mobile = user.mobile;

    next();

  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};