//controllers/blogs.js
const blogsRouter = require("express").Router();
const { createBlogs, getAllBlogs, updateBlog } = require("./blogsController");

blogsRouter.get("/", getAllBlogs);
blogsRouter.post("/", createBlogs);
blogsRouter.put("/", updateBlog);

module.exports = blogsRouter;
