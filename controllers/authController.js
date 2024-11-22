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

    return res
      .status(201)
      .json({
        message: "User registered successfully"
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};

module.exports = { register, login };
