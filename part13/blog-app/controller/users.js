const router = require("express").Router();
const { User, Blog } = require("../models");

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

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: { username },
      include: {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
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
