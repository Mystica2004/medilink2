// src/components/Navbar.jsx

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profile, setProfile] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch profile in Navbar", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUploadPicture = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/users/upload-profile-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <nav className="w-full bg-white p-4 px-6 flex justify-between items-center shadow-sm fixed top-0 left-0 z-50">
      <h1
        className="text-2xl font-semibold text-[#3f1e41] cursor-pointer"
        onClick={() => navigate("/")}
      >
        MediLink
      </h1>

      <div className="relative">
        {profile?.profilePicture ? (
          <img
            src={`http://localhost:5000/uploads/profile-pictures/${profile.profilePicture}`}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover cursor-pointer border-2 border-gray-300 hover:border-[#3f1e41] transition duration-200"
            onClick={() => setOpen(!open)}
          />
        ) : (
          <button
            onClick={() => setOpen(!open)}
            className="w-12 h-12 rounded-full bg-gray-200 text-[#3f1e41] font-semibold text-lg flex items-center justify-center hover:bg-gray-300 transition duration-200"
          >
            {profile?.name?.charAt(0).toUpperCase() || "U"}
          </button>
        )}

        {open && (
          <div className="absolute right-0 mt-3 bg-white rounded-lg shadow-lg w-52 py-2 z-50 border border-gray-200">
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              View Profile
            </button>

            <label className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition cursor-pointer">
              Upload Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                  setTimeout(() => handleUploadPicture(), 300);
                  setOpen(false);
                }}
              />
            </label>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
