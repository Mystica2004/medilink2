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
    const fetchProfile = async () => {
      // 1. Guard: no token → redirect to login
      if (!token) {
        console.log("No token found in localStorage");
        navigate("/login");
        return;
      }

      console.log("Found token:", token);

      try {
        // 2. Hit your backend profile endpoint
        const res = await axios.get(
          "http://localhost:5000/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("🔥 Full profile payload:", res.data);

        // 3. Unwrap user object if nested under `res.data.user`
        const user = res.data.user ?? res.data;

        // 4. Role check → if not "doctor", send them home
        if (user.role !== "doctor") {
          console.warn("User role is not doctor:", user.role);
          navigate("/");
          return;
        }

        // 5. All good → store user and stop loader
        setDoctor(user);
      } catch (err) {
        console.error(
          "Profile API request failed:",
          err.response?.data || err.message
        );
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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
      <p>
        <strong>Name:</strong> {doctor.name}
      </p>
      <p>
        <strong>Email:</strong> {doctor.email}
      </p>
      <p>
        <strong>Specialization:</strong> {doctor.specialization}
      </p>
    </div>
  );
}

export default DoctorProfile;