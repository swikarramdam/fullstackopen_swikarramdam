const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  await blog.destroy();
  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  const { likes } = req.body;
  if (likes !== undefined) blog.likes = likes;

  await blog.save();
  res.json(blog);
});

module.exports = router;
