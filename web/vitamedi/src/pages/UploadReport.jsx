import { useEffect, useState } from "react";
import axios from "axios";
import ExtractedTextCard from "../components/ExtractedTextCard";
import Select from "react-select";

const UploadReport = () => {
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState(null);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports", err);
    }
  };

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
    } catch (err) {
      console.error("Error fetching doctors", err);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchDoctors();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedDoctor) {
      setMessage("Please select a file and doctor.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("doctorId", selectedDoctor.value);

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/reports/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("✅ Report uploaded successfully!");
      setFile(null);
      setSelectedDoctor(null);
      fetchReports();
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reportId) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    try {
      await axios.delete(`http://localhost:5000/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Report deleted.");
      fetchReports();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c8a2c8] via-[#e6c7e6] to-[#f4d5f4] p-8">
      <h1 className="text-3xl font-bold text-[#5D3A66] mb-4 text-center">📄 Upload Medical Report</h1>

      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto space-y-4 mb-8"
      >
        <div>
          <label className="block font-medium text-[#5D3A66] mb-1">Select Doctor</label>
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
          <label className="block font-medium text-[#5D3A66] mb-1">Select Report File</label>
          <input
            type="file"
            className="w-full p-2 rounded border border-[#c8a2c8] focus:outline-[#c8a2c8]"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#c8a2c8] hover:bg-[#b089b0] text-white py-2 rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Report"}
        </button>

        {message && (
          <p className="text-center text-[#5D3A66] font-medium">{message}</p>
        )}
      </form>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-[#5D3A66] mb-4">📝 Uploaded Reports</h2>
        {reports.length === 0 ? (
          <p className="text-center text-[#5D3A66]">No reports uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report._id} className="bg-white p-4 rounded-lg shadow border border-[#c8a2c8]/30">
                <div className="flex justify-between items-center">
                  <div>
                    <p><strong>Doctor:</strong> {report.doctorId?.name || "N/A"}</p>
                    <p><strong>Uploaded:</strong> {new Date(report.createdAt).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
                <ExtractedTextCard extractedText={report.extractedText || "No text extracted"} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadReport;
