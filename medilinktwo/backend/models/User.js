const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["doctor", "patient"], required: true },
  
  // ✅ Add this field to support profile picture uploads:
  profilePicture: { type: String, default: "" },

  profile: {
    age: Number,
    gender: String,
    specialization: String // For doctors only
  }
}, { timestamps: true }); // Optional: adds createdAt, updatedAt automatically

module.exports = mongoose.model("User", userSchema);
