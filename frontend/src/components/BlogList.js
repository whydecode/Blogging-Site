// BlogList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/BlogList.css";
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

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
          <div className="blog-content">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">{blog.content}</p>
            <p className="blog-date">
              Created At: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p className="blog-author">
              Author:{" "}
              {blog.author.charAt(0).toUpperCase() + blog.author.slice(1)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
