import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function LandingPage({ username, password }) {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:3000/api/users/logout", { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative scroll-none overflow-hidden">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-black to-black"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="relative w-full max-w-md p-8 rounded-xl shadow-lg bg-white">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Welcome, {username}
        </h2>

        {/* Info Card */}
        <div className="space-y-4">
          <div>
            <label className="block text-black mb-1">Username</label>
            <div className="w-full px-4 py-3 rounded-lg border border-black bg-gray-100 text-black">
              {username}
            </div>
          </div>
          <div>
            <label className="block text-black mb-1">Password</label>
            <div className="w-full px-4 py-3 rounded-lg border border-black bg-gray-100 text-black">
              {password}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <button onClick={handleSubmit} className="px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
