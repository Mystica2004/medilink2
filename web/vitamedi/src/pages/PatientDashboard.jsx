// src/pages/PatientDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const PatientDashboard = () => {
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !doctorId) {
      alert("Please select a file and enter doctor ID");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("doctorId", doctorId);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/reports/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Report uploaded successfully ✅");
      setFile(null);
      setDoctorId("");
      fetchReports(); // refresh
    } catch (err) {
      setMessage("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">👋 Welcome to Your Dashboard</h1>

      <form onSubmit={handleUpload} className="bg-white text-black p-4 rounded-lg shadow-md w-full max-w-md mb-8">
        <h2 className="text-xl font-semibold mb-2">Upload Medical Report</h2>
        <input
          type="file"
          className="mb-2"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Doctor ID"
          className="w-full border p-2 mb-3"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </form>

      <div>
        <h2 className="text-2xl font-semibold mb-4">📝 Uploaded Reports</h2>
        {reports.length === 0 ? (
          <p>No reports uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report._id} className="bg-white text-black p-4 rounded shadow">
                <p><strong>Doctor:</strong> {report.doctorId?.name || "N/A"}</p>
                <p><strong>Uploaded:</strong> {new Date(report.createdAt).toLocaleString()}</p>
                <p><strong>Extracted Text:</strong></p>
                <pre className="bg-gray-100 text-gray-800 p-2 overflow-x-auto whitespace-pre-wrap">{report.extractedText || "No text extracted"}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
