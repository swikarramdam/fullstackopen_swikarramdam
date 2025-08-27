const Blog = require("../models/blog");
//get
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

const createBlogs = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
};
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: truee,
      context: "query",
    });
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(updateBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { getAllBlogs, createBlogs, updateBlog };
