const router = require("express").Router();
const userExtractor = require("../middleware/userExtractor");
const { Blog, User } = require("../models");
const { sequelize } = require("../util/db");

// Get user's reading list
router.get("/", userExtractor, async (req, res, next) => {
  try {
    // Get reading list directly from database
    const readingList = await sequelize.query(
      `
      SELECT 
        rl.id as readingListId,
        rl.read,
        b.id,
        b.title,
        b.author,
        b.url,
        b.likes,
        b.year,
        b.created_at,
        b.updated_at
      FROM reading_lists rl
      JOIN blogs b ON rl.blog_id = b.id
      WHERE rl.user_id = :userId
      ORDER BY rl.created_at DESC
    `,
      {
        replacements: { userId: req.user.id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(readingList);
  } catch (err) {
    next(err);
  }
});

// Add blog to reading list
router.post("/", userExtractor, async (req, res, next) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(400).json({ error: "blogId is required" });
    }

    // Check if blog exists
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Check if already in reading list
    const [existing] = await sequelize.query(
      `
      SELECT id FROM reading_lists 
      WHERE user_id = :userId AND blog_id = :blogId
    `,
      {
        replacements: { userId: req.user.id, blogId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (existing) {
      return res.status(400).json({ error: "Blog already in reading list" });
    }

    // Add to reading list directly in database
    const [result] = await sequelize.query(
      `
      INSERT INTO reading_lists (user_id, blog_id, read, created_at, updated_at)
      VALUES (:userId, :blogId, false, NOW(), NOW())
      RETURNING id, read
    `,
      {
        replacements: { userId: req.user.id, blogId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Get the blog with user info
    const blogWithUser = await Blog.findByPk(blogId, {
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name", "username"],
      },
    });

    res.status(201).json({
      ...blogWithUser.toJSON(),
      readingListId: result.id,
      read: result.read,
    });
  } catch (err) {
    next(err);
  }
});

// Mark blog as read/unread in reading list
router.put("/:id", userExtractor, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    if (typeof read !== "boolean") {
      return res.status(400).json({ error: "read must be a boolean" });
    }

    // Get reading list item and verify it belongs to user
    const [readingListItem] = await sequelize.query(
      `
      SELECT rl.*, b.id as blog_id, b.title, b.author, b.url, b.likes, b.year
      FROM reading_lists rl
      JOIN blogs b ON rl.blog_id = b.id
      WHERE rl.id = :id AND rl.user_id = :userId
    `,
      {
        replacements: { id: parseInt(id), userId: req.user.id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!readingListItem) {
      return res.status(404).json({ error: "Reading list item not found" });
    }

    // Update read status
    await sequelize.query(
      `
      UPDATE reading_lists 
      SET read = :read, updated_at = NOW()
      WHERE id = :id
    `,
      {
        replacements: { id: parseInt(id), read },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    // Get updated blog info
    const blog = await Blog.findByPk(readingListItem.blog_id, {
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name", "username"],
      },
    });

    res.json({
      id: readingListItem.id,
      read: read,
      blog: blog.toJSON(),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
