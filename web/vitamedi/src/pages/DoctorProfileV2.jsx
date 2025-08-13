import { useState, useEffect } from "react";
import axios from "axios";
import DoctorDashboardLayout from "./DoctorDashboardLayout";
import { FaUser, FaEnvelope, FaStethoscope, FaBriefcase, FaCamera, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const DoctorProfileV2 = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  
  // Editable fields state
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [uploadingPic, setUploadingPic] = useState(false);
  
  const token = localStorage.getItem("token");

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(res.data);
        setName(res.data.name || "");
        setSpecialization(res.data.profile?.specialization || "");
        setExperience(res.data.profile?.experience || "");
      } catch (err) {
        console.error("Failed to fetch profile", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  // Update profile handler
  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        "http://localhost:5000/users/profile",
        {
          name,
          profile: { specialization, experience },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDoctor(res.data);
      setEditing(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Update profile failed", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Profile picture upload handler
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePictureFile(file);
    setUploadingPic(true);
    const formData = new FormData();
    formData.append("profilePicture", file);
    try {
      const res = await axios.post(
        "http://localhost:5000/users/upload-profile-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update profilePicture in state
      setDoctor((prev) => ({
        ...prev,
        profilePicture: res.data.profilePicture,
      }));
      alert("Profile picture updated");
    } catch (err) {
      console.error("Profile picture upload failed", err);
      alert("Failed to upload profile picture");
    } finally {
      setUploadingPic(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditing(false);
    // Reset form values to original values
    setName(doctor?.name || "");
    setSpecialization(doctor?.profile?.specialization || "");
    setExperience(doctor?.profile?.experience || "");
  };

  if (loading) {
    return (
      <DoctorDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DoctorDashboardLayout>
    );
  }

  if (error) {
    return (
      <DoctorDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
            <p className="text-red-600 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </DoctorDashboardLayout>
    );
  }

  return (
    <DoctorDashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">My Profile</h1>
            <p className="text-blue-100">Manage your personal and professional information</p>
          </div>
          
          {/* Profile Picture Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-4 border-white shadow-lg">
                  {doctor?.profilePicture ? (
                    <img
                      src={`http://localhost:5000/uploads/profile-pictures/${doctor.profilePicture}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-5xl">👤</div>
                  )}
                </div>
                
                <label
                  htmlFor="profilePicture"
                  className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-50 transition shadow-md"
                >
                  <FaCamera />
                </label>
              </div>
              
              <div className="flex-1">
                <div className="mb-4">
                  <label
                    htmlFor="profilePicture"
                    className="cursor-pointer bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition inline-flex items-center"
                  >
                    {uploadingPic ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaCamera className="mr-2" />
                        Change Picture
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                    disabled={uploadingPic}
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    {editing ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                          <input
                            type="number"
                            min="0"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium text-gray-900">{name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Specialization</p>
                          <p className="font-medium text-gray-900">{specialization || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Experience</p>
                          <p className="font-medium text-gray-900">{experience ? `${experience} years` : "Not specified"}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    {editing ? (
                      <>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                        >
                          <FaTimes className="mr-2" />
                          Cancel
                        </button>
                        <button
                          onClick={handleUpdateProfile}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          <FaSave className="mr-2" />
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditing(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaEnvelope className="text-blue-500 mr-2" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{doctor?.email}</p>
                  </div>
                  {doctor?.profile?.contact && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{doctor.profile.contact}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaStethoscope className="text-blue-500 mr-2" />
                  Professional Details
                </h3>
                <div className="space-y-3">
                  {doctor?.profile?.consultationFee && (
                    <div>
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                      <p className="font-medium text-gray-900">${doctor.profile.consultationFee}</p>
                    </div>
                  )}
                  {doctor?.profile?.clinicDetails?.name && (
                    <div>
                      <p className="text-sm text-gray-500">Clinic Name</p>
                      <p className="font-medium text-gray-900">{doctor.profile.clinicDetails.name}</p>
                    </div>
                  )}
                  {doctor?.profile?.clinicDetails?.timings && (
                    <div>
                      <p className="text-sm text-gray-500">Timings</p>
                      <p className="font-medium text-gray-900">{doctor.profile.clinicDetails.timings}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {doctor?.profile?.bio && (
              <div className="mt-6 bg-gray-50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Bio</h3>
                <p className="text-gray-700 whitespace-pre-line">{doctor.profile.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DoctorDashboardLayout>
  );
};

export default DoctorProfileV2;