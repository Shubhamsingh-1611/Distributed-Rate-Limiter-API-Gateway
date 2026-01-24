import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginSchema } from "../utility/zodSchema.js";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    const result = loginSchema.safeParse(userData); // method of zod to validate data

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      return;
    } else {
     setErrors({});
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", userData , { withCredentials: true });
      console.log("Login successful:", response.data.token);
      toast.success("Login successful!");
      navigate("/user");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed: " + error.response.data.message);
    }
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
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Login
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-black mb-2">Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p style={{color:"red"}}>{errors.email?._errors?.[0]}</p>
          </div>
          <div>
            <label className="block text-black mb-2">Password</label>
            <input
              type="password"
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value})}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p style={{color:"red"}}>{errors.password?._errors?.[0]}</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition duration-300"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm text-black">
          {/* <a href="#" className="hover:underline">Forgot Password?</a> */}
          <a href="#" className="hover:underline" onClick={() => navigate("/register")}>Create Account</a>
        </div>
      </div>
    </div>
  );
}
