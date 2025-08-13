// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import BookAppointment from "./pages/BookAppointment";
import UploadReport from "./pages/UploadReport";
import ViewReports from "./pages/ViewReports";
import AppointmentHistory from "./pages/AppointmentHistory";
import DoctorHome from "./pages/DoctorHome";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorProfileV2 from "./pages/DoctorProfileV2"; // Add this import
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 👇 Show Landing Page on / */}
        <Route path="/" element={<LandingPage />} />
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Dashboards */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor-home" element={<DoctorHome />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        {/* Doctor Profile V2 */}
        <Route path="/doctor-profile-v2" element={<DoctorProfileV2 />} /> {/* Add this route */}
        {/* Common Pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/upload-report" element={<UploadReport />} />
        <Route path="/view-reports" element={<ViewReports />} />
        <Route path="/appointments" element={<AppointmentHistory />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);