import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/BlogList.css";
const MyBlogsScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const getMyBlogs = async () => {
    const userToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const response = await axios.get(`/api/blogs/myblogs`, config);
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    const userToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      await axios.delete(`/api/blogs/${id}`, config);
      getMyBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  const createNewBlog = async (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const response = await axios.post(`/api/blogs`, {}, config);
      navigate(`/blogForm/${response.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMyBlogs();
  }, []);

  return (
    <div>
      <div className="blogscreen-buttons">
        <Link to={"/"} className="goback">
          Go Back
        </Link>
        <button onClick={createNewBlog} className="goback">
          Create Blog
        </button>
      </div>
      <div className="all-blogs">
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

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="del-button"
                >
                  Delete
                </button>
                <button className="del-button edit-button">
                  <Link to={`/blogForm/${blog._id}`}>Edit</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogsScreen;
