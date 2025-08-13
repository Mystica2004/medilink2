import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

// User Pages
import Profile from "./pages/Profile";

// Doctor Pages
import DoctorHome from "./pages/DoctorHome";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorProfile from "./pages/Profile"; // old profile page
import DoctorProfileV2 from "./pages/DoctorProfileV2"; // new profile page

// Route Protection
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ---------- Public Routes ---------- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* ---------- Protected Routes (Any User) ---------- */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ---------- Protected Routes (Doctor Only) ---------- */}
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
      <Route
        path="/doctor-profile-v2"
        element={
          <ProtectedRoute role="doctor">
            <DoctorProfileV2 />
          </ProtectedRoute>
        }
      />

      {/* ---------- Fallback Route ---------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
