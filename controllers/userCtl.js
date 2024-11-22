const Auth = require("../model/authModel");

// Get all users (admin only)
const GetallUser = async (req, res) => {
  try {
    const users = await Auth.find();

    res.status(200).json({
      message: "Data fetched successfully",
      data: users,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const GetuserbyId = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User found",
      data: user,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const user = await Auth.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User updated",
      data: user,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const user = await Auth.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User deleted success",
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { GetallUser, GetuserbyId, UpdateUser, DeleteUser };
