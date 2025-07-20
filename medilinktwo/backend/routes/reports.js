const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const protect = require("../middleware/authMiddleware");

const {
  uploadReport,
  getReports,
  deleteReport,
  getReportsForDoctor, // ✅ ADD THIS
} = require("../controllers/reportController");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes

// ✅ Upload report (OCR)
router.post("/upload", protect, upload.single("file"), uploadReport);

// ✅ View reports (based on user role)
router.get("/", protect, getReports);

// ✅ Delete report
router.delete("/:id", protect, deleteReport);

// ✅ Doctor-specific reports
router.get("/doctor", protect, getReportsForDoctor);

module.exports = router;
