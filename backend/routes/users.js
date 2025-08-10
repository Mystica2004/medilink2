// routes/users.js
const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadProfilePicture,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure uploads/profile-pictures directory exists
const uploadDir = path.join(__dirname, "../uploads/profile-pictures");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ===== Routes =====

// Get logged-in user's profile
router.get("/profile", protect, getProfile);

// Update logged-in user's profile
router.put("/profile", protect, updateProfile);

// Upload profile picture
router.post(
  "/upload-profile-picture",
  protect,
  upload.single("profilePicture"),
  uploadProfilePicture
);

// Get list of doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select(
      "name specialization _id"
    );
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
});

module.exports = router;
