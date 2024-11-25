const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/authModel");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use." });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};

const login = async (req, res) => {
  try {
    // Authenticate user...
    const user = await User.findOne({ email: req.body.email });

    const token = jwt.sign(
      {
        _id: user._id, // Include userId in the token
        email: user.email,
        username: user.username,
        role: user.role, // Optional: Include role if needed
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
