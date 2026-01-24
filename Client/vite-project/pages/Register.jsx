import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registerSchema } from "../utility/zodSchema.js";
import { useState } from "react";
import { toast } from "react-toastify";



export default function Register() {
 
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  

  const handleSubmit = async (e) => {
     
    e.preventDefault(); // Prevent default form submission behavior

    const result = registerSchema.safeParse(userData); // method of zod to validate data

    if (!result.success) {   
    const formattedErrors = result.error.format(); 
    setErrors(formattedErrors);
    } else {
      setErrors({});
      try {
        const response = await axios.post("http://localhost:3000/api/users/register", userData);  
        console.log("Registration successful:", response.data);
        toast.success("Registration successful! Please login.");
        navigate("/login");
      
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Registration failed"+ error.response.data.message);
        
      }
  }
  };  


  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative scroll-none overflow-hidden ">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-black to-black"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="relative w-full max-w-md p-8 rounded-xl shadow-lg bg-white mt-[40px]">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Register
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-black mb-2">Username</label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => setUserData({...userData, username: e.target.value})}
              placeholder="yourusername"
              className="w-full px-4 py-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p style={{color:"red"}}>{errors.username?._errors?.[0]}</p>
          </div>
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
              type="text"
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value})}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p style={{color:"red"}}>{errors.password?._errors?.[0]}</p>
          </div>

          <div>
            <label className="block text-black mb-2">Confirm Password</label>
            <input
              type="text"
              value={userData.confirmPassword}
              onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p style={{color:"red"}}>{errors.confirmPassword?._errors?.[0]}</p>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm text-black">
          <a href="#" className="hover:underline" onClick={() => navigate("/login")}>Already have an account?</a>
          {/* <a href="#" className="hover:underline">Login</a> */}
        </div>
      </div>
    </div>
  );
}
