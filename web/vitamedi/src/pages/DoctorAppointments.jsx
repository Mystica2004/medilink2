import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaUserInjured, FaEnvelope, FaCalendarAlt, FaSearch, FaFilter, FaCheck, FaTimes, FaCommentAlt } from "react-icons/fa";
import RejectModal from '../modals/RejectModal';
import DoctorDashboardLayout from "./DoctorDashboardLayout";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const token = localStorage.getItem("token");
  
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/appointments/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAppointments();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const today = new Date();
  
  const filteredAppointments = appointments.filter((appt) => {
    const matchDate = selectedDate
      ? isSameDay(new Date(appt.dateTime), selectedDate)
      : true;
    const matchSearch =
      appt.patientId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.patientId?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "all" || appt.status === statusFilter;
    return matchDate && matchSearch && matchStatus;
  });

  // Custom calendar styling
  const calendarTileClass = ({ date, view }) => {
    if (view !== 'month') return '';
    
    const classes = [];
    const isToday = isSameDay(date, today);
    const hasAppt = appointments.some((appt) =>
      isSameDay(new Date(appt.dateTime), date)
    );
    
    if (isToday) classes.push('today');
    if (hasAppt) classes.push('has-appointment');
    
    return classes.join(' ');
  };

  return (
    <DoctorDashboardLayout>
      <div className="text-gray-800">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointment Requests</h1>
          <p className="text-gray-600">Manage and respond to patient appointment requests</p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by patient name or email"
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendar Section */}
          <div className="lg:w-[320px] w-full">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                Select a Date
              </h2>
              <div className="calendar-container">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileClassName={calendarTileClass}
                  className="custom-calendar"
                />
              </div>
              <button
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium block mx-auto transition-colors"
                onClick={() => setSelectedDate(null)}
              >
                Show All Appointments
              </button>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                <div className="text-gray-400 mb-4">
                  <FaCalendarAlt className="text-5xl mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No appointments found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAppointments.map((appt) => {
                  const apptDate = new Date(appt.dateTime);
                  const isPast = apptDate < today && !isSameDay(apptDate, today);
                  
                  return (
                    <div
                      key={appt._id}
                      className={`rounded-2xl shadow-sm p-6 transition-all hover:shadow-md ${
                        isPast
                          ? "bg-gray-50 text-gray-400 border border-gray-200"
                          : "bg-white text-gray-800 border border-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 mb-1">
                            {appt.patientId?.name || "N/A"}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <FaEnvelope className="mr-2 text-blue-500" />
                            <span>{appt.patientId?.email || "N/A"}</span>
                          </div>
                        </div>
                        <span
                          className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                            appt.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : appt.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        <span>{formatDate(appt.dateTime)}</span>
                      </div>
                      
                      {appt.reason && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Reason:</span> {appt.reason}
                          </p>
                        </div>
                      )}
                      
                      {!isPast && appt.status === "pending" && (
                        <div className="flex gap-3">
                          <button
                            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                            onClick={() => updateStatus(appt._id, "confirmed")}
                          >
                            <FaCheck /> Confirm
                          </button>
                          <button
                            className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                            onClick={() => updateStatus(appt._id, "cancelled")}
                          >
                            <FaTimes /> Cancel
                          </button>
                          <button
                            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-2.5 px-4 rounded-xl text-sm font-medium transition-colors"
                            onClick={() => setShowRejectModal(true)}
                          >
                            <FaCommentAlt />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Calendar Styles */}
      <style jsx>{`
        .calendar-container {
          border-radius: 12px;
          overflow: hidden;
        }
        .custom-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
        }
        .custom-calendar .react-calendar__navigation {
          background-color: #f9fafb;
          padding: 10px;
          border-bottom: 1px solid #e5e7eb;
        }
        .custom-calendar .react-calendar__navigation button {
          color: #3b82f6;
          font-weight: bold;
          font-size: 16px;
        }
        .custom-calendar .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 12px;
          color: #6b7280;
        }
        .custom-calendar .react-calendar__tile {
          padding: 10px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .custom-calendar .react-calendar__tile:hover {
          background-color: #dbeafe;
        }
        .custom-calendar .react-calendar__tile--active {
          background: linear-gradient(to right, #3b82f6, #0d9488);
          color: white;
        }
        .custom-calendar .react-calendar__tile--now {
          background-color: #eff6ff;
          border: 2px solid #3b82f6;
        }
        .custom-calendar .has-appointment {
          position: relative;
        }
        .custom-calendar .has-appointment::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background-color: #10b981;
          border-radius: 50%;
        }
        .custom-calendar .today {
          border: 2px solid #3b82f6;
          background-color: #eff6ff;
        }
      `}</style>
    </DoctorDashboardLayout>
  );
};

export default DoctorAppointments;