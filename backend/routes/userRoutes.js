const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
// Register endpoint
router.post("/register", (req, res) => {
  // ...
  const { name, email, password } = req.body;
  // Generate a salt and hash the password
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "User Already Exists" });
    }
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;

      // Create a new user
      const newUser = new User({ name, email, password: hash });

      // Save the user to the database
      newUser
        .save()
        .then((user) => {
          // Create a JWT token
          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

          // Set the token as a cookie
          res.cookie("token", token, { httpOnly: true });

          return res.json({ message: "Registration successful", user });
        })
        .catch((err) => console.log(err));
    });
  });
});

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: "User not found" });
      }

      // Compare the entered password with the hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          // Create a JWT token
          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

          // Set the token as a cookie
          res.cookie("token", token, { httpOnly: true });

          return res.json({ message: "Login successful", user, token });
        } else {
          return res.status(400).json({ password: "Incorrect password" });
        }
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
