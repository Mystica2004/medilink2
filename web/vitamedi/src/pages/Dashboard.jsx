import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Book Appointment",
    description: "Schedule a visit with your doctor",
    route: "/book-appointment",
  },
  {
    title: "Appointment History",
    description: "View your past and upcoming appointments",
    route: "/appointments",
  },
  {
    title: "Upload Medical Report",
    description: "Submit a scanned copy of your medical report",
    route: "/upload-report",
  },
  {
    title: "View Reports",
    description: "See your diagnostic reports and OCR results",
    route: "/view-reports",
  },
  {
    title: "Profile Management",
    description: "Edit and view your personal profile details",
    route: "/profile",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c8a2c8] via-[#e6c7e6] to-[#f4d5f4] pt-20">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-[#5D3A66] mb-6 text-center">Welcome to the Patients Board! Stay healthy, stay happy!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              onClick={() => navigate(feature.route)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer border border-[#c8a2c8]/30 transition-all duration-300 hover:bg-[#f8f0f8]"
            >
              <h3 className="text-xl font-semibold text-[#5D3A66] mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
