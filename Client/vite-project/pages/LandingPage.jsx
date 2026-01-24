import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from  "react-toastify";
export default function LandingPage() {
  const [userData,setUserData] = React.useState({});

const makeRequest = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/users/data",
      { withCredentials: true }
    );
    console.log("Request success:", res.data);
    toast.success("Request successful");
  } catch (err) {
    console.error("Request failed", err);
  }
};

const spamRequests = async () => {
  for (let i = 0; i < 5; i++) {
    makeRequest();
  }
};

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 429) {
      // Show a friendly message
      alert("You have made too many requests in a short period. Please wait a moment before trying again.");
      toast.error("Too many requests. Please wait a moment before refreshing.");

    }
    return Promise.reject(error);
  }
);

  
  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/me", { withCredentials: true });  
        console.log("User data fetched:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);

      }
    };

    fetchUserData();
  }, []);

  const { username, email } = userData;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:3000/api/users/logout", { withCredentials: true });
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Error: " + error.response.data.message);
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
            <label className="block text-black mb-1">Email</label>
            <div className="w-full px-4 py-3 rounded-lg border border-black bg-gray-100 text-black">
              {email}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-3">
  <button
    onClick={makeRequest}
    className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
  >
    Make API Request
  </button>

  <button
    onClick={spamRequests}
    className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
  >
    Spam Requests (Trigger Rate Limit)
  </button>

  <button
    onClick={handleSubmit}
    className="px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
  >
    Logout
  </button>
</div>

      </div>
    </div>
  );
}
