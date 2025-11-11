const router = require("express").Router();
const userExtractor = require("../middleware/userExtractor");
const { sequelize } = require("../util/db");

router.delete("/", userExtractor, async (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    const token = authorization.substring(7); // Remove "Bearer "

    // Delete session from database
    await sequelize.query(
      `
      DELETE FROM sessions 
      WHERE token = :token
    `,
      {
        replacements: { token },
      }
    );

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
