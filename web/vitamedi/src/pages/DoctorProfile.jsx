import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DoctorProfile() {
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // No token → go login
      return;
    }

    axios
      .get("http://localhost:5000/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.role !== "doctor") {
          navigate("/"); // Not a doctor → send home
          return;
        }
        setDoctor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load doctor profile", err);
        navigate("/login"); // Bad token → go login
      });
  }, [navigate, token]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h1>Doctor Profile</h1>
      <p><strong>Name:</strong> {doctor.name}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      {/* You can add profile picture and other fields here */}
    </div>
  );
}

export default DoctorProfile;
