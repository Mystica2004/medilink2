import {
  FaHome,
  FaUserInjured,
  FaFileMedical,
  FaCalendarCheck,
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
  FaUser,
  FaTimes,
  FaEdit
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-20 md:w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col py-6 px-4 shadow-xl z-10">
      <div className="flex items-center mb-10 px-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
          <span className="text-white font-bold text-xl">M</span>
        </div>
        <div className="hidden md:block ml-3">
          <h1 className="text-xl font-bold">MediLink</h1>
          <p className="text-xs text-gray-400">Doctor Portal</p>
        </div>
      </div>
      <nav className="space-y-2 flex-1 overflow-y-auto">
        <SidebarItem icon={<FaHome />} label="Dashboard" to="/doctor-home" />
        <SidebarItem icon={<FaUserInjured />} label="Patients" to="/doctor-patients" />
        <SidebarItem icon={<FaFileMedical />} label="Reports" to="/doctor-dashboard" />
        <SidebarItem icon={<FaCalendarCheck />} label="Appointments" to="/doctor-appointments" />
        <SidebarItem icon={<FaUser />} label="My Profile" to="/doctor-profile-v2" />
      </nav>
      <div className="pt-4 border-t border-gray-700">
        <SidebarItem icon={<FaSignOutAlt />} label="Logout" to="/" />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-4 p-3 rounded-xl transition text-gray-300 hover:bg-gray-800"
  >
    <span className="text-xl">{icon}</span>
    <span className="hidden md:block font-medium">{label}</span>
  </Link>
);

const DoctorDashboardLayout = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!token) {
        setAuthError(true);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(res.data);
      } catch (err) {
        console.error("Failed to fetch doctor data", err);
        if (err.response && err.response.status === 401) {
          setAuthError(true);
          localStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorData();
  }, [token]);

  useEffect(() => {
    if (authError) {
      navigate("/login");
    }
  }, [authError, navigate]);

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  if (loading) {
    return (
      <div className="flex bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen ml-20 md:ml-64">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (authError) {
    return null;
  }

  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-20 md:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Doctor Dashboard</h1>
            <p className="text-sm text-gray-500">
              {loading ? "Loading..." : `Welcome back, Dr. ${doctor?.name}`}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition">
              <FaBell className="text-xl" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {/* Profile button that triggers popup */}
            <div className="relative">
              <button 
                onClick={toggleProfilePopup}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
                  {doctor?.profilePicture ? (
                    <img
                      src={`http://localhost:5000/uploads/profile-pictures/${doctor.profilePicture}`}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="text-white text-xl" />
                  )}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">Dr. {doctor?.name}</p>
                  <p className="text-xs text-gray-500">{doctor?.profile?.specialization || "Doctor"}</p>
                </div>
              </button>
              
              {/* Profile Popup */}
              {showProfilePopup && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg z-50 border border-gray-200">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-gray-800">Doctor Profile</h3>
                      <button 
                        onClick={toggleProfilePopup}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center mr-4">
                        {doctor?.profilePicture ? (
                          <img
                            src={`http://localhost:5000/uploads/profile-pictures/${doctor.profilePicture}`}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <FaUserCircle className="text-white text-2xl" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Dr. {doctor?.name}</p>
                        <p className="text-sm text-gray-600">{doctor?.profile?.specialization || "General Practitioner"}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm text-gray-800">{doctor?.email || "No email provided"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Specialization</p>
                        <p className="text-sm text-gray-800">{doctor?.profile?.specialization || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Experience</p>
                        <p className="text-sm text-gray-800">{doctor?.profile?.experience ? `${doctor.profile.experience} years` : "Not specified"}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          navigate("/doctor-profile-v2");
                          setShowProfilePopup(false);
                        }}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                      >
                        <FaEdit /> Edit Profile
                      </button>
                      <button
                        onClick={toggleProfilePopup}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;