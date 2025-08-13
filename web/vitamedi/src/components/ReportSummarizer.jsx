// src/components/ReportSummarizer.js
import { useState } from "react";
import { FaFileUpload, FaFileMedical, FaClipboardList, FaChartLine, FaSpinner } from "react-icons/fa";
import axios from "axios";

const ReportSummarizer = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [summary, setSummary] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      
      // Create preview for image files
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");
    
    const formData = new FormData();
    formData.append("report", file);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post("http://localhost:5000/reports/summarize", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSummary(response.data.summary);
      setAnalysis(response.data.analysis);
      setActiveTab("summary");
    } catch (err) {
      console.error("Error summarizing report:", err);
      setError("Failed to analyze the report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setSummary("");
    setAnalysis("");
    setError("");
    setActiveTab("upload");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-blue-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaFileMedical className="mr-3 text-blue-500" /> Medical Report Summarizer
      </h2>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === "upload" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("upload")}
        >
          Upload Report
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === "summary" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("summary")}
          disabled={!summary}
        >
          Summary & Analysis
        </button>
      </div>
      
      {activeTab === "upload" && (
        <div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Upload Medical Report</label>
            <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center bg-blue-50 transition-colors hover:bg-blue-100">
              {preview ? (
                <div className="flex flex-col items-center">
                  {file.type.startsWith("image/") ? (
                    <img src={preview} alt="Report preview" className="max-h-60 rounded-lg mb-4" />
                  ) : (
                    <div className="bg-blue-100 rounded-full p-4 mb-4">
                      <FaFileMedical className="text-blue-600 text-3xl" />
                    </div>
                  )}
                  <p className="text-gray-700 font-medium mb-2">{file.name}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div>
                  <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                    <FaFileUpload className="text-blue-600 text-3xl" />
                  </div>
                  <p className="text-gray-700 mb-2">Drag & drop your report here</p>
                  <p className="text-gray-500 text-sm mb-4">
                    Supports: JPG, PNG, PDF (Max 10MB)
                  </p>
                  <label className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg cursor-pointer transition-colors inline-block">
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className={`flex items-center gap-2 font-medium py-3 px-6 rounded-lg transition-colors ${
                loading || !file
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <FaChartLine /> Analyze Report
                </>
              )}
            </button>
          </div>
        </div>
      )}
      
      {activeTab === "summary" && (
        <div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaClipboardList className="mr-2 text-blue-500" /> Report Summary
            </h3>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <p className="text-gray-700 whitespace-pre-line">{summary}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaChartLine className="mr-2 text-blue-500" /> Medical Analysis
            </h3>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <p className="text-gray-700 whitespace-pre-line">{analysis}</p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={resetForm}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Analyze Another Report
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Save to Patient Records
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportSummarizer;