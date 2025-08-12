import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Landing from "./pages/LandingPage";
import DoctorHome from "./pages/DoctorHome";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorProfile from "./pages/DoctorProfile";

import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes - User */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Doctor Only */}
      <Route
        path="/doctor-home"
        element={
          <ProtectedRoute role="doctor">
            <DoctorHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor-appointments"
        element={
          <ProtectedRoute role="doctor">
            <DoctorAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor-profile"
        element={
          <ProtectedRoute role="doctor">
            <DoctorProfile />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
