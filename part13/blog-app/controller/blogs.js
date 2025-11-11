const router = require("express").Router();
const userExtractor = require("../middleware/userExtractor");
const { Blog } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post("/", userExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    await blog.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      throw new Error("Blog not found"); // ✅ thrown -> middleware catches
    }

    blog.likes = req.body.likes;
    await blog.save();
    res.json(blog);
  } catch (err) {
    next(err); // ✅ sends error to errorHandler middleware
  }
});

module.exports = router;
