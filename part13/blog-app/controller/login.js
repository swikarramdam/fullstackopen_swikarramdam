const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: "invalid username" });
  }

  const userfortoken = { username: user.username, id: user.id };
  const token = jwt.sign(userfortoken, process.env.SECRET, { expiresIn: "1h" });
  res.json({ token, username: user.username, name: user.name });
});

module.exports = router;
