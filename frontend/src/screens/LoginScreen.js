import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    axios
      .post("/api/users/login", credentials)
      .then((res) => {
        const { token, user } = res.data;

        // Store the token and user details in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Clear the form
        setEmail("");
        setPassword("");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleLogin} className="loginForm">
        <p className="form-title">Sign in to your account</p>
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
          Login
        </button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginScreen;
