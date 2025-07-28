const MedicalReport = require("../models/MedicalReport");
const Tesseract = require("tesseract.js");
const path = require("path");
const User = require("../models/User");

// ✅ Upload Report with OCR & Doctor Validation
exports.uploadReport = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // ✅ Validate doctor
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(400).json({ message: "Invalid doctor ID" });
    }

    const filePath = file.path;

    // 🔍 OCR with Tesseract.js
    const result = await Tesseract.recognize(
      path.resolve(filePath),
      'eng',
      { logger: m => console.log(m) }
    );

    const extractedText = result.data.text;

    const report = await MedicalReport.create({
      patientId: req.user.id,
      doctorId,
      filePath,
      extractedText
    });

    res.status(201).json({
      message: "Report uploaded & text extracted",
      report,
      extractedText
    });

  } catch (err) {
    res.status(500).json({ message: "OCR or upload failed", error: err.message });
  }
};

// ✅ Get reports based on user role (doctor sees theirs, patient sees theirs)
exports.getReports = async (req, res) => {
  try {
    const role = req.user.role;
    const filter = role === "doctor"
      ? { doctorId: req.user.id }
      : { patientId: req.user.id };

    const reports = await MedicalReport.find(filter)
      .populate("doctorId", "name email")
      .populate("patientId", "name email");

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports", error: err.message });
  }
};

// ✅ New: Get all reports sent to a specific doctor (for /reports/doctor)
exports.getReportsForDoctor = async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const reports = await MedicalReport.find({ doctorId: req.user.id })
      .populate("patientId", "name email")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching doctor reports", error: err.message });
  }
};

// ✅ Delete report (only by patient)
exports.deleteReport = async (req, res) => {
  try {
    const report = await MedicalReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    if (report.patientId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await report.deleteOne();
    res.json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting report", error: err.message });
  }
};
