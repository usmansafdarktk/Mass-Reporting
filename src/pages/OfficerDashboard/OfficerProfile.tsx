import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";

const OfficerProfile: React.FC = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    fullName: "Inspector Zain",
    email: "zain@traffic.gov.pk",
    phone: "0301-6547890",
    cnic: "35201-6543210-9",
    department: "Traffic Management",
    role: "Field Officer",
    organization: "Punjab Traffic Police",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    setIsEditing(false);
    console.log("Updated officer:", userInfo);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-[#1e293b] border dark:border-gray-600 p-8 rounded-lg shadow-md text-black dark:text-white">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Officer Profile</h2>

        {/* View Mode */}
        {!isEditing && (
          <div className="space-y-4 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                <FaUser className="text-xl text-gray-800" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Full Name</p>
                  <p className="font-semibold">{userInfo.fullName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                <FaEnvelope className="text-xl text-gray-800" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Email</p>
                  <p className="font-semibold">{userInfo.email}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                <FaPhone className="text-xl text-gray-800" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Phone</p>
                  <p className="font-semibold">{userInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                <FaIdCard className="text-xl text-gray-800" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">CNIC</p>
                  <p className="font-semibold">{userInfo.cnic}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                <FaBriefcase className="text-xl text-gray-800" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Department</p>
                  <p className="font-semibold">{userInfo.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                <FaUser className="text-xl text-gray-800" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Role</p>
                  <p className="font-semibold">{userInfo.role}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
              <FaBuilding className="text-xl text-gray-800" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">Organization</p>
                <p className="font-semibold">{userInfo.organization}</p>
              </div>
            </div>
          </div>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="space-y-6 border-t border-gray-300 pt-6 mt-6"
          >
            <h3 className="text-lg font-semibold mb-2">Edit Officer Profile</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Full Name", name: "fullName", placeholder: "e.g. Inspector Zain" },
                { label: "Email", name: "email", placeholder: "e.g. zain@traffic.gov.pk" },
                { label: "Phone", name: "phone", placeholder: "e.g. 0301-6547890" },
                { label: "CNIC", name: "cnic", placeholder: "e.g. 35201-6543210-9" },
                { label: "Department", name: "department", placeholder: "e.g. Traffic Management" },
                { label: "Role", name: "role", placeholder: "e.g. Field Officer" },
              ].map(({ label, name, placeholder }) => (
                <div key={name} className="w-full">
                  <label htmlFor={name} className="block text-sm font-medium mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    id={name}
                    name={name}
                    value={userInfo[name as keyof typeof userInfo]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-gray-800 focus:outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="w-full">
              <label htmlFor="organization" className="block text-sm font-medium mb-1">Organization</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={userInfo.organization}
                onChange={handleChange}
                placeholder="e.g. Punjab Traffic Police"
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

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
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-900"
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

export default OfficerProfile;
