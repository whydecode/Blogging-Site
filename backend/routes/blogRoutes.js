const express = require("express");
const router = express.Router();


const blogController = require("../controllers/blogControllers");
const authenticateUser = require("../middleware/authMiddleware");



// Create a blog, get all blogs
router
  .route("/")
  .post(authenticateUser, blogController.createBlog)
  .get(blogController.getAllBlogs);

router.route("/myblogs").get(authenticateUser, blogController.getBlogsByUser);

// Get a specific blog by ID
router
  .route("/:id")
  .get(blogController.getBlogById)
  .put(authenticateUser, blogController.updateBlog)
  .delete(authenticateUser, blogController.deleteBlog);

module.exports = router;
