// middleware/userExtractor.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      req.user = await User.findByPk(decodedToken.id);
      if (!req.user) {
        return res.status(401).json({ error: "user not found" });
      }
    } catch (error) {
      return res.status(401).json({ error: "token invalid or missing" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};
module.exports = userExtractor;
