const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/user");
const { sequelize } = require("../util/db");

router.post("/", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: "invalid username" });
  }

  // Check if user is disabled
  if (user.disabled) {
    return res.status(401).json({ error: "user account is disabled" });
  }

  const userfortoken = { username: user.username, id: user.id };
  const token = jwt.sign(userfortoken, process.env.SECRET, { expiresIn: "1h" });

  // Store session in database
  await sequelize.query(
    `
    INSERT INTO sessions (token, user_id, created_at, updated_at)
    VALUES (:token, :userId, NOW(), NOW())
  `,
    {
      replacements: { token, userId: user.id },
      type: sequelize.QueryTypes.INSERT,
    }
  );

  res.json({ token, username: user.username, name: user.name });
});

module.exports = router;
