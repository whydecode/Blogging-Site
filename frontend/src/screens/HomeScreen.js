import React, { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import { Link } from "react-router-dom";
import "../css/HomeScreen.css";
const HomeScreen = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogin(true);
    }
  }, []);
  return (
    <div>
      <div className="isLogin">
        {isLogin ? (
          <Link to={"/myblogs"} className="home-blog-button">
            Create New Blog
          </Link>
        ) : (
          <h3>
            Please <Link to="/login">Login</Link> to create your own blogs
          </h3>
        )}
      </div>
      <div className="all-blogs">
        <div className="blog-head">
          <div>
            <h1>New Blogs</h1>
          </div>
        </div>

        <BlogList />
      </div>
    </div>
  );
};

export default HomeScreen;
