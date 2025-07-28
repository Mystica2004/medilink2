const Appointment = require("../models/Appointment");
const User = require("../models/User"); // add this

exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, dateTime } = req.body;

    // Step 1: Check if doctorId is valid
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(400).json({ message: "Invalid doctor ID ❌" });
    }

    // Step 2: Create appointment
    const appointment = await Appointment.create({
      doctorId,
      patientId: req.user.id,
      dateTime,
    });

    res.status(201).json({ message: "Appointment booked ✅", appointment });
  } catch (err) {
    res.status(500).json({ message: "Error booking appointment", error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const role = req.user.role;

    let appointments;
    if (role === "doctor") {
      appointments = await Appointment.find({ doctorId: req.user.id }).populate("patientId", "name email");
    } else {
      appointments = await Appointment.find({ patientId: req.user.id }).populate("doctorId", "name email specialization");
    }

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments", error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: "Status updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating status", error: err.message });
  }
};
