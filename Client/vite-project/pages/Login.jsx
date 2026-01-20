import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative scroll-none overflow-hidden">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-black to-black"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="relative w-full max-w-md p-8 rounded-xl shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Login
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-black mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-black mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm text-black">
          <a href="#" className="hover:underline">Forgot Password?</a>
          <a href="#" className="hover:underline">Create Account</a>
        </div>
      </div>
    </div>
  );
}
