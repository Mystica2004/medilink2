// src/utils/auth.js
import { jwtDecode } from "jwt-decode"; // 👈 FIXED HERE

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // 👈 use jwtDecode
    return decoded; // { id, role, iat, exp }
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
