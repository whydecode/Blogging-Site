import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    // Send a POST request to the backend API
    axios
      .post("/api/users/register", newUser)
      .then((res) => {
        const { token, user } = res.data;
        console.log(user);
        // Store the token and user details in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(localStorage.getItem("user"));
        // Clear the form
        setName("");
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleRegister} className="loginForm">
        <p className="form-title">Create a new account</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit" type="submit">
          Register
        </button>
      </form>
      <p className="signup-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
