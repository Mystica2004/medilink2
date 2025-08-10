import { useEffect, useState } from "react";
import axios from "axios";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c8a2c8] via-[#e6c7e6] to-[#f4d5f4] p-8">
      <h1 className="text-3xl font-bold text-[#5D3A66] mb-6">📖 Your Appointment History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt._id} className="bg-white p-4 rounded-lg shadow border border-[#c8a2c8]/30">
              <p><strong>Doctor:</strong> {appt.doctorId?.name || "N/A"}</p>
              <p><strong>Email:</strong> {appt.doctorId?.email || "N/A"}</p>
              <p><strong>Date & Time:</strong> {new Date(appt.dateTime).toLocaleString()}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`px-2 py-1 rounded text-sm font-semibold ${
                  appt.status === "pending"
                    ? "bg-yellow-500 text-black"
                    : appt.status === "confirmed"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}>
                  {appt.status.toUpperCase()}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
