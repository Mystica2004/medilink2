import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const BookAppointment = () => {
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formatted = res.data.map((doc) => ({
          value: doc._id,
          label: `Dr. ${doc.name} (${doc.specialization || "General"})`,
        }));
        setDoctorOptions(formatted);
      } catch {
        setMessage("⚠️ Could not load doctors.");
      }
    };
    fetchDoctors();
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !dateTime) {
      setMessage("Please select a doctor and valid date/time.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/appointments",
        { doctorId: selectedDoctor.value, dateTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Appointment booked successfully!");
      setSelectedDoctor(null);
      setDateTime("");
    } catch {
      setMessage("❌ Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c8a2c8] via-[#e6c7e6] to-[#f4d5f4] p-8 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-[#5D3A66] mb-6">📅 Book an Appointment</h1>
      <form onSubmit={handleBook} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <div>
          <label className="block mb-1 font-medium text-[#5D3A66]">Select Doctor</label>
          <Select
            options={doctorOptions}
            value={selectedDoctor}
            onChange={setSelectedDoctor}
            placeholder="Search for doctors..."
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "#c8a2c8",
                boxShadow: "none",
                '&:hover': { borderColor: "#b089b0" }
              }),
            }}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#5D3A66]">Select Date & Time</label>
          <input
            type="datetime-local"
            className="w-full p-3 rounded border border-[#c8a2c8] focus:outline-[#c8a2c8]"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#c8a2c8] hover:bg-[#b089b0] text-white py-2 rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>

        {message && (
          <p className="text-center text-[#5D3A66] font-medium">{message}</p>
        )}
      </form>
    </div>
  );
};

export default BookAppointment;
