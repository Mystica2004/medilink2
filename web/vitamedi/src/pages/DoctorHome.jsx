import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaFileMedical,
  FaCalendarCheck,
  FaUserInjured,
  FaUserMd,
  FaNotesMedical,
  FaArrowRight,
  FaUser,
} from "react-icons/fa";
import DoctorDashboardLayout from "./DoctorDashboardLayout";

const DoctorHome = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const token = localStorage.getItem("token");

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
          // Token is invalid or expired
          setAuthError(true);
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("name");
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
  
  const handleNavigation = (route) => {
    console.log("Navigating to:", route);
    console.log("Token exists:", !!token);
    navigate(route);
  };
  
  const actions = [
    {
      icon: <FaFileMedical size={28} className="text-white" />,
      title: "View Reports",
      desc: "Access patient reports and OCR summaries.",
      route: "/doctor-dashboard",
      bg: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaCalendarCheck size={28} className="text-white" />,
      title: "Manage Appointments",
      desc: "Approve or reschedule patient bookings.",
      route: "/doctor-appointments",
      bg: "from-teal-500 to-teal-600",
    },
    {
      icon: <FaUserInjured size={28} className="text-white" />,
      title: "View Patients",
      desc: "Browse through your patient records.",
      route: "/doctor-patients",
      bg: "from-purple-500 to-purple-600",
    },
  ];
  
  const stats = [
    {
      title: "Appointments Today",
      value: 12,
      icon: <FaCalendarCheck size={20} className="text-green-600" />,
      bg: "bg-green-100",
      border: "border-green-200",
    },
    {
      title: "Patients This Week",
      value: 48,
      icon: <FaUserMd size={20} className="text-purple-600" />,
      bg: "bg-purple-100",
      border: "border-purple-200",
    },
    {
      title: "Pending Reports",
      value: 5,
      icon: <FaNotesMedical size={20} className="text-red-500" />,
      bg: "bg-red-100",
      border: "border-red-200",
    },
  ];

  // Get specialization theme
  const getSpecializationTheme = (specialization) => {
    if (!specialization) return "from-purple-500 to-indigo-600";
    
    const spec = specialization.toLowerCase();
    
    if (spec.includes("cardio") || spec.includes("heart")) {
      return "from-pink-500 to-rose-500";
    } else if (spec.includes("neuro") || spec.includes("brain")) {
      return "from-blue-500 to-cyan-500";
    } else if (spec.includes("dental") || spec.includes("tooth")) {
      return "from-teal-500 to-emerald-500";
    } else if (spec.includes("eye") || spec.includes("opto")) {
      return "from-indigo-500 to-purple-500";
    } else if (spec.includes("ped") || spec.includes("child")) {
      return "from-yellow-500 to-amber-500";
    } else if (spec.includes("ortho") || spec.includes("bone")) {
      return "from-gray-500 to-slate-600";
    } else {
      return "from-purple-500 to-indigo-600";
    }
  };

  const theme = getSpecializationTheme(doctor?.profile?.specialization);

  if (loading) {
    return (
      <DoctorDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DoctorDashboardLayout>
    );
  }

  if (authError) {
    return null; // This will redirect to login
  }

  return (
    <DoctorDashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back, Doctor</h1>
        <p className="text-gray-600">Here's what's happening with your practice today.</p>
      </div>
      
      {/* Profile Card */}
      <div className="mb-8">
        <div className={`bg-gradient-to-r ${theme} rounded-2xl shadow-lg p-6 text-white`}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
              {doctor?.profilePicture ? (
                <img 
                  src={`http://localhost:5000/uploads/profile-pictures/${doctor.profilePicture}`}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FaUser className="text-4xl" />
              )}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-1">Dr. {doctor?.name || localStorage.getItem("name")}</h2>
              <p className="text-pink-100 mb-3">
                {doctor?.profile?.specialization || "General Practitioner"} 
                {doctor?.profile?.experience && ` • ${doctor?.profile?.experience} years experience`}
              </p>
              <button 
                onClick={() => handleNavigation("/doctor-profile")}
                className="bg-white text-pink-600 hover:bg-pink-50 px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 mx-auto md:mx-0"
              >
                <FaUser /> View My Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-sm p-6 border ${item.border} transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{item.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                </div>
                <div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center`}>
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Actions Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(item.route)}
              className="cursor-pointer group"
            >
              <div className={`bg-gradient-to-br ${item.bg} rounded-2xl shadow-lg p-6 h-full transition-all transform group-hover:scale-[1.03] group-hover:shadow-xl`}>
                <div className="flex flex-col h-full">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-blue-100 mb-4 flex-grow">{item.desc}</p>
                  <div className="flex items-center text-white font-medium group-hover:translate-x-1 transition-transform">
                    <span>Access</span>
                    <FaArrowRight className="ml-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Upcoming Appointments Preview */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Today's Schedule</h2>
          <button 
            onClick={() => handleNavigation("/doctor-appointments")}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            View All <FaArrowRight className="ml-1 text-sm" />
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="space-y-4">
            {[
              { time: "9:00 AM", name: "Michael Chen", type: "Follow-up" },
              { time: "10:30 AM", name: "Emma Rodriguez", type: "Consultation" },
              { time: "1:15 PM", name: "Robert Kim", type: "Check-up" },
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-medium">{appointment.time.substring(0, 1)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{appointment.name}</p>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                  </div>
                </div>
                <div className="text-gray-500 font-medium">{appointment.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DoctorDashboardLayout>
  );
};

export default DoctorHome;