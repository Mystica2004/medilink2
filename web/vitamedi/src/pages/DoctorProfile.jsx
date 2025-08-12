import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DoctorProfile() {
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.log("No token found in localStorage");
      navigate("/login");
      return;
    }

    console.log("Found token:", token);

    axios
      .get("http://localhost:5000/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Profile API response:", res.data);

        if (res.data.role !== "doctor") {
          console.warn("User role is not doctor:", res.data.role);
          navigate("/");
          return;
        }

        setDoctor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile API request failed:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to load profile");
        setLoading(false);
        // Comment out the redirect for debugging
        // navigate("/login");
      });
  }, [navigate, token]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Doctor Profile</h1>
      <p><strong>Name:</strong> {doctor.name}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
    </div>
  );
}

export default DoctorProfile;
