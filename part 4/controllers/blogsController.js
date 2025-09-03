const Blog = require("../models/blog");
//get
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blogs);
};

const createBlog = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes || 0,
      user: req.user._id,
    });
    const savedBlog = await blog.save();
    req.user.blogs = req.user.blogs.concat(savedBlog._id);
    await req.user.save();

    res.status(201).json(savedBlog);
    console.log("Creating blog for user:", req.user.username);
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
      runValidators: true,
      context: "query",
    });
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  console.log("request user,", req.user);
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    console.log("Found blog:", blog);
    console.log("Blog user type:", typeof blog.user);
    console.log("Blog user:", blog.user);
    console.log("Req user type:", typeof req.user._id);
    console.log("Req user:", req.user._id);

    // Ensure we're comparing strings
    const blogUserId = blog.user._id
      ? blog.user._id.toString()
      : blog.user.toString();
    const requestUserId = req.user._id.toString();

    console.log("Comparing IDs:");
    console.log("Blog user ID:", blogUserId);
    console.log("Request user ID:", requestUserId);
    console.log("Are IDs equal?", blogUserId === requestUserId);

    if (blogUserId !== requestUserId) {
      return res.status(401).json({
        error: "Unauthorized",
        blogUserId: blogUserId,
        requestUserId: requestUserId,
      });
    }

    await Blog.findByIdAndDelete(id);

    req.user.blogs = req.user.blogs.filter((b) => b.toString() !== id);
    await req.user.save();
    console.log("Blog user:", blog.user);
    console.log("Req user:", req.user._id.toString());
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllBlogs, createBlog, updateBlog, deleteBlog };
