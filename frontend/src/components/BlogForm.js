// BlogForm.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
    <form>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={uploadFileHandler} />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" onClick={handleSubmit}>
        {"Create Blog"}
      </button>
    </form>
  );
};

export default BlogForm;
