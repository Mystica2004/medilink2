import { useEffect, useState } from "react";
import axios from "axios";

const DoctorDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/reports/doctor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">
        📄 Reports Sent to You
      </h1>

      {loading ? (
        <p className="text-center text-lg text-gray-700">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="text-center text-lg text-gray-700">
          No reports uploaded to you yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-6"
            >
              <div className="mb-2 text-gray-800 font-medium text-lg">
                👤 Patient: {report.patientId?.name || "N/A"}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                📅 Uploaded:{" "}
                {new Date(report.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>

              <div className="text-sm">
                <p className="font-semibold text-blue-700 mb-2">📝 Extracted Text:</p>
                <pre className="bg-gray-50 p-3 rounded-lg overflow-y-auto max-h-48 whitespace-pre-wrap text-sm text-gray-800 border border-gray-200 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent">
                  {report.extractedText || "No text extracted"}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
