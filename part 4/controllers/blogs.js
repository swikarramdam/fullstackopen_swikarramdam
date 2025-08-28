//controllers/blogs.js
const blogsRouter = require("express").Router();
const { createBlogs, getAllBlogs, updateBlog } = require("./blogsController");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogsRouter.get("/", getAllBlogs);
blogsRouter.post("/", createBlogs);
blogsRouter.put("/", updateBlog);
blogsRouter.post("/", tokenExtractor, userExtractor, createBlogs);

module.exports = blogsRouter;
