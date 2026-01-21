import React from "react";
import {useNavigate} from "react-router-dom";



export default function Hero() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative scroll-none overflow-hidden">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-black to-black"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="relative w-full max-w-md p-10 rounded-xl shadow-lg bg-white text-center">
        {/* Header */}
        <h1 className="text-3xl font-bold text-black mb-8">
          Welcome to API Rate Limiter
        </h1>

        {/* Buttons */}
        <div className="flex flex-col space-y-4">
         
          <button onClick={() => navigate("/login")} className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
