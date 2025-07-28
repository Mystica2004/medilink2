const mongoose = require("mongoose");

const medicalReportSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filePath: { type: String, required: true },
  extractedText: { type: String }, // NEW FIELD for OCR
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MedicalReport", medicalReportSchema);
