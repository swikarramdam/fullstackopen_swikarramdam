// middleware/userExtractor.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sequelize } = require("../util/db");

const userExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    try {
      // Verify token signature
      const decodedToken = jwt.verify(token, process.env.SECRET);

      // Check if session exists in database
      const [session] = await sequelize.query(
        `
        SELECT * FROM sessions 
        WHERE token = :token
      `,
        {
          replacements: { token },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (!session) {
        return res.status(401).json({ error: "session expired or invalid" });
      }

      // Get user and check if disabled
      req.user = await User.findByPk(decodedToken.id);
      if (!req.user) {
        return res.status(401).json({ error: "user not found" });
      }

      if (req.user.disabled) {
        return res.status(401).json({ error: "user account is disabled" });
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
