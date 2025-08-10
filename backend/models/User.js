const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["doctor", "patient"], required: true },
  
  // Profile picture
  profilePicture: { type: String, default: "" },
  
  // Extended profile information
  profile: {
    age: Number,
    gender: String,
    specialization: String, // For doctors only
    experience: Number, // For doctors (years)
    consultationFee: Number, // For doctors
    bio: String, // For both
    clinicDetails: {
      name: String,
      address: String,
      timings: String
    } // For doctors
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);