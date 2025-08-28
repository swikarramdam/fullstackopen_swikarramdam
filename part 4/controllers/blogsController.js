const Blog = require("../models/blog");
//get
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

const createBlogs = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes || 0,
      user: req.user._id, // link to logged-in user
    });
    const savedBlog = await blog.save();
    req.user.blogs = req.user.blogs.concat(savedBlog._id);
    await req.user.save();

    // const blog = new Blog(req.body);
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
