// BlogList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/BlogList.css";
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  const handleExpandClick = (blogId) => {
    setExpandedBlogId(blogId);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="blog-container">
      {blogs.map((blog) => (
        <div key={blog._id} className="blog">
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <div className="blog-info">
            <span className="blog-author">
              {blog.author.charAt(0).toUpperCase() + blog.author.slice(1)} |
            </span>
            <span className="blog-date">
              {" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="blog-content">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">{blog.content.slice(0, 200) + "..."}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
