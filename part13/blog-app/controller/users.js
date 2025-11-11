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

    // Build WHERE clause based on query parameter
    let whereClause = "WHERE rl.user_id = :userId";
    const replacements = { userId: id };

    // Filter by read status if query parameter is provided
    if (req.query.read !== undefined) {
      const readValue = req.query.read === "true";
      whereClause += " AND rl.read = :readValue";
      replacements.readValue = readValue;
    }

    // Get user's reading list from database with reading_lists table info
    const readings = await sequelize.query(
      `
      SELECT 
        b.id,
        b.url,
        b.title,
        b.author,
        b.likes,
        b.year,
        rl.id as readinglist_id,
        rl.read as readinglist_read
      FROM reading_lists rl
      JOIN blogs b ON rl.blog_id = b.id
      ${whereClause}
      ORDER BY rl.created_at DESC
    `,
      {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Format the response to match the required structure
    const formattedReadings = readings.map((reading) => ({
      id: reading.id,
      url: reading.url,
      title: reading.title,
      author: reading.author,
      likes: reading.likes,
      year: reading.year,
      readinglists: [
        {
          read: reading.readinglist_read,
          id: reading.readinglist_id,
        },
      ],
    }));

    res.json({
      name: user.name,
      username: user.username,
      readings: formattedReadings,
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
