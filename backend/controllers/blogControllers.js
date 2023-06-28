// blogController.js
const Blog = require("../models/BlogModel");

// Create a new blog
const createBlog = async (req, res) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const blog = new Blog({
      title: "Sample Title",
      image: "/images/sample.jpg",
      content: "Sample Content",
      author: req.user.name, // Set the author as the user ID of the logged-in user
      user: req.user._id,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog" });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// Get a specific blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  console.log(req.body);
  const { title, image, content } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.title = title;
    blog.image = image;
    blog.content = content;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

// Get all blogs created by a particular user
const getBlogsByUser = async (req, res) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const blogs = await Blog.find({ user: req.user._id });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByUser,
};
