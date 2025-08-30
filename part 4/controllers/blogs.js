//controllers/blogs.js
const blogsRouter = require("express").Router();
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
} = require("./blogsController");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogsRouter.get("/", getAllBlogs);
blogsRouter.post("/", tokenExtractor, userExtractor, createBlog);
blogsRouter.put("/:id", updateBlog);
// blogsRouter.delete("/:id", tokenExtractor, userExtractor, deleteBlog);
blogsRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  (req, res, next) => {
    console.log("DELETE route hit!", req.params.id);
    next();
  },
  deleteBlog
);

module.exports = blogsRouter;
