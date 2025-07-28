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

// Create uploads/profile-pictures if not exists
const fs = require("fs");
const uploadDir = "uploads/profile-pictures";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Profile routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/update-profile", protect, updateProfile);

// Upload profile picture
router.post(
  "/upload-profile-picture",
  protect,
  upload.single("profilePicture"),
  uploadProfilePicture
);

// Fetch doctors for booking
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select(
      "name specialization _id"
    );
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
});

module.exports = router;
