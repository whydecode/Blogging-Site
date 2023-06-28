import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
const Navbar = () => {
  const [user, setUser] = useState();
  const [dropdown, setDropdown] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const getLoggedInUser = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  };

  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    const userDetail = getLoggedInUser();
    setUser(userDetail);
    if (userDetail) {
      setName(
        userDetail.name.charAt(0).toUpperCase() + userDetail.name.slice(1)
      );
    }
  }, [name]);
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <h1>Makcorps-Blogs</h1>
      </Link>

      {user ? (
        <div className="username-div">
          <h4>
            Hi, {name}{" "}
            <svg
              onClick={dropdownHandler}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </h4>{" "}
          {dropdown && (
            <div className="dropdown-menu">
              <button className="logoutButton" onClick={handleLogout}>
                Logout
              </button>
              <Link
                to={"/myblogs"}
                className="logoutButton"
                onClick={dropdownHandler}
              >
                My Blogs
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Navbar;
