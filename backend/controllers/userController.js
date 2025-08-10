// controllers/userController.js
const User = require("../models/User");
const path = require("path");

// GET /users/profile
exports.getProfile = (req, res) => {
  // req.user is already loaded from middleware
  res.json(req.user);
};

// PUT /users/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, profile } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (profile) {
      updateFields.profile = { ...req.user.profile, ...profile };
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: err.message });
  }
};

// POST /users/upload-profile-picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture: req.file.filename },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile picture updated successfully",
      profilePicture: updatedUser.profilePicture,
    });
  } catch (err) {
    console.error("Upload profile picture error:", err);
    res.status(500).json({ message: err.message });
  }
};
