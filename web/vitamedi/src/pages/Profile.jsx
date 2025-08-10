import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first.");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

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
      alert(res.data.message);
      setUser((prev) => ({
        ...prev,
        profilePicture: res.data.profilePicture,
      }));
    } catch (err) {
      console.error("Error uploading profile picture:", err.response?.data || err.message);
      alert("Failed to upload profile picture");
    }
  };

  if (loading) return <p>Loading...</p>;

  return user ? (
    <div style={{ padding: "20px" }}>
      <h1>My Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      {user.profilePicture && (
        <img
          src={`http://localhost:5000/uploads/profile-pictures/${user.profilePicture}`}
          alt="Profile"
          width={150}
          style={{ display: "block", marginBottom: "10px" }}
        />
      )}

      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Profile Picture</button>
      </div>
    </div>
  ) : (
    <p>No profile data found.</p>
  );
};

export default Profile;
