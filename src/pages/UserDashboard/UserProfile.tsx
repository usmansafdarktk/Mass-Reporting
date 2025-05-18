import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    fullName: "Usman Ahmed",
    email: "usman@email.com",
    phone: "0300-1234567",
    cnic: "35201-1234567-1",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    setIsEditing(false);
    console.log("Updated user:", userInfo);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-[#1e293b] border dark:border-gray-600 p-8 rounded-lg shadow-md text-black dark:text-white">
        <h2 className="text-3xl font-bold mb-8">My Profile</h2>

        {/* Profile Overview */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-1 items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
              <FaUser className="text-xl text-blue-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">Full Name</p>
                <p className="font-semibold">{userInfo.fullName}</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
              <FaEnvelope className="text-xl text-blue-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">Email</p>
                <p className="font-semibold">{userInfo.email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-1 items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
              <FaPhone className="text-xl text-blue-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">Phone</p>
                <p className="font-semibold">{userInfo.phone}</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
              <FaIdCard className="text-xl text-blue-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">CNIC</p>
                <p className="font-semibold">{userInfo.cnic}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-6 border-t border-gray-300 pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>

            {/* Row 1: Name + Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Usman Ahmed"
                  className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter your full legal name.</p>
              </div>
              <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  placeholder="e.g. usman@email.com"
                  className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">We'll use this for communication and login.</p>
              </div>
            </div>

            {/* Row 2: Phone + CNIC */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                  placeholder="e.g. 0300-1234567"
                  className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Include area code.</p>
              </div>
              <div className="w-full">
                <label htmlFor="cnic" className="block text-sm font-medium mb-1">CNIC</label>
                <input
                  type="text"
                  id="cnic"
                  name="cnic"
                  value={userInfo.cnic}
                  onChange={handleChange}
                  placeholder="e.g. 35201-1234567-1"
                  className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must match your official CNIC number.</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
