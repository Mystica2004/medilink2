import { useEffect, useState } from "react";
import axios from "axios";
import { FaFileMedical, FaUser, FaCalendarAlt, FaSearch, FaFilter, FaEye, FaDownload } from "react-icons/fa";
import DoctorDashboardLayout from "./DoctorDashboardLayout";

const DoctorDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
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

  // Filter reports based on search term and filter
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.patientId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.extractedText?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "recent") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return matchesSearch && new Date(report.createdAt) >= oneWeekAgo;
    }
    return matchesSearch;
  });

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <DoctorDashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Reports</h1>
        <p className="text-gray-600">View and manage patient medical reports</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by patient name or report content"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Reports</option>
              <option value="recent">Recent Reports (Last 7 days)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm p-6 border border-blue-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <FaFileMedical className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Reports</p>
              <p className="text-3xl font-bold text-gray-800">{reports.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <FaUser className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Unique Patients</p>
              <p className="text-3xl font-bold text-gray-800">
                {[...new Set(reports.map(r => r.patientId?._id))].length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl shadow-sm p-6 border border-purple-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <FaCalendarAlt className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">This Week</p>
              <p className="text-3xl font-bold text-gray-800">
                {reports.filter(r => {
                  const oneWeekAgo = new Date();
                  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                  return new Date(r.createdAt) >= oneWeekAgo;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Medical Reports</h2>
          <div className="text-sm text-gray-500">
            Showing {filteredReports.length} of {reports.length} reports
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
              <FaFileMedical className="text-blue-500 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No reports found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm || filter !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "No medical reports have been uploaded to you yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map((report) => (
              <div
                key={report._id}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <FaUser className="text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {report.patientId?.name || "Unknown Patient"}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 ml-12">
                      <FaCalendarAlt className="mr-2" />
                      <span>{formatDate(report.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition">
                      <FaEye />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition">
                      <FaDownload />
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Extracted Text:</h4>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
                    <p className="text-gray-800 whitespace-pre-line text-sm">
                      {report.extractedText || "No text extracted from this report"}
                    </p>
                  </div>
                </div>
                
                {report.fileUrl && (
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">Original Document</span>
                    <a
                      href={`http://localhost:5000/${report.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      View Document <FaDownload className="ml-1" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DoctorDashboardLayout>
  );
};

export default DoctorDashboard;