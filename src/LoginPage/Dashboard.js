import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div
        onClick={() => navigate("/bookings")}
        className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition cursor-pointer"
      >
        <h2 className="text-xl font-semibold mb-2">My Bookings</h2>
        <p className="text-gray-600">View and manage your service bookings.</p>
      </div>

      <div
        onClick={() => navigate("/services")}
        className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition cursor-pointer"
      >
        <h2 className="text-xl font-semibold mb-2">Available Services</h2>
        <p className="text-gray-600">Explore services offered by QuickFix.</p>
      </div>

      <div
        onClick={() => navigate("/profile")}
        className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition cursor-pointer"
      >
        <h2 className="text-xl font-semibold mb-2">My Profile</h2>
        <p className="text-gray-600">Update personal information and settings.</p>
      </div>

      <div className="col-span-full text-center mt-8">
        <button
          onClick={() => navigate("/logout")}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
