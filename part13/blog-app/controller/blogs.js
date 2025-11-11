const router = require("express").Router();
const { Op } = require("sequelize");
const userExtractor = require("../middleware/userExtractor");
const { Blog, User } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const where = {};

    if (req.query.search) {
      where.title = {
        [Op.iLike]: `%${req.query.search}%`,
      };
    }

    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name", "username"],
      },
      where,
    });
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
    const blogWithUser = await Blog.findByPk(blog.id, {
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name", "username"],
      },
    });
    res.status(201).json(blogWithUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    if (blog.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Only the creator can delete this blog" });
    }
    await blog.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name", "username"],
      },
    });
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
