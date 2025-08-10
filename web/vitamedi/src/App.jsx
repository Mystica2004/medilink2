import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Landing from "./pages/LandingPage";
import DoctorHome from "./pages/DoctorHome";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorProfile from "./pages/DoctorProfile"; // Add this import

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />               
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Doctor Dashboard Routes */}
      <Route path="/doctor-home" element={<DoctorHome />} />
      <Route path="/doctor-appointments" element={<DoctorAppointments />} />
      <Route path="/doctor-profile" element={<DoctorProfile />} /> {/* Add this route */}
      
      {/* Optional fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;