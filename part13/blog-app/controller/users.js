const router = require("express").Router();
const { User, Blog } = require("../models");
const { sequelize } = require("../util/db");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get user's reading list from database
    const readings = await sequelize.query(
      `
      SELECT 
        b.id,
        b.url,
        b.title,
        b.author,
        b.likes,
        b.year
      FROM reading_lists rl
      JOIN blogs b ON rl.blog_id = b.id
      WHERE rl.user_id = :userId
      ORDER BY rl.created_at DESC
    `,
      {
        replacements: { userId: id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json({
      name: user.name,
      username: user.username,
      readings: readings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:username", async (req, res) => {
  const { username } = req.params;
  const { name } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  user.name = name;
  await user.save();
  res.json(user);
});

module.exports = router;
