//controllers/blogs.js
const blogsRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");
blogsRouter.get("/", async (req, res) => {
  const blogs = await blog.find({});
  res.json(blogs);
});
blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  if (!body.title || !body.url) {
    return res.status(400).json({ error: "title or url missing" });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

module.exports = blogsRouter;
