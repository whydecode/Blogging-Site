// BlogForm.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/BlogForm.css";
const BlogForm = () => {
  const { blogId } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const getBlogById = async (id) => {
    try {
      const response = await axios.get(`/api/blogs/${id}`);
      setTitle(response.data.title);
      setImage(response.data.image);
      setContent(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      image,
      content,
    };
    const userToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      await axios.put(`/api/blogs/${blogId}`, newBlog, config);
      navigate("/myblogs");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (blogId) {
      // console.log(blogId);
      getBlogById(blogId);
    }
  }, [blogId]);

  return (
    <div className="blogform-container">
      <form className="blog-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            className="form-input"
            onChange={uploadFileHandler}
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="form-submit" onClick={handleSubmit}>
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
