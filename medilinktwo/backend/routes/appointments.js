const router = require("express").Router();
const { createAppointment, getAppointments, updateStatus } = require("../controllers/appointmentController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);
router.put("/:id/status", protect, updateStatus);

module.exports = router;

router.get('/test', (req, res) => {
  res.send('Appointments route is working!');
});
