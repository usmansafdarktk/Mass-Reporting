import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";
import { logoutUser, getOfficerProfile, updateOfficerProfile } from "../../utils/userauth";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const OfficerProfile: React.FC = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    cnic: "",
    department: "",
    role: "",
    organization: "",
    profileImage: "/images/user-profile.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getOfficerProfile();
        if (data) setUserInfo((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Error fetching officer profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProfileImage(file);
      setUserInfo(prev => ({
        ...prev,
        profileImage: URL.createObjectURL(file), // preview
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true); 
      let imageUrl = userInfo.profileImage;
      if (newProfileImage) {
        imageUrl = await uploadToCloudinary(newProfileImage);
      }
      await updateOfficerProfile({ ...userInfo, profileImage: imageUrl });
      setUserInfo(prev => ({ ...prev, profileImage: imageUrl }));
      setIsEditing(false);
    } catch (err) {
      alert("Update failed.");
    } finally {
    setLoading(false); 
  }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-[#1e293b] border dark:border-gray-600 p-8 rounded-lg shadow-md text-black dark:text-white">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Officer Profile</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={userInfo.profileImage || "/images/user-profile.png"}
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover border-2 border-blue-600"
          />
        </div>

        {/* Overview */}
        {!isEditing && (
          <div className="space-y-4 mb-6">
            {[
              { icon: <FaUser />, label: "Full Name", value: userInfo.fullName },
              { icon: <FaEnvelope />, label: "Email", value: userInfo.email },
              { icon: <FaPhone />, label: "Phone", value: userInfo.phone },
              { icon: <FaIdCard />, label: "CNIC", value: userInfo.cnic },
              { icon: <FaBriefcase />, label: "Department", value: userInfo.department },
              { icon: <FaUser />, label: "Role", value: userInfo.role },
              { icon: <FaBuilding />, label: "Organization", value: userInfo.organization },
            ].filter(field => field.value).map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                {React.cloneElement(icon, { className: "text-xl text-gray-800" })}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Form */}
        {isEditing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="space-y-6 border-t border-gray-300 pt-6 mt-6"
          >
            <h3 className="text-lg font-semibold mb-2">Edit Officer Profile</h3>

            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500 dark:text-gray-300"
            />
            {newProfileImage && (
              <p className="text-xs mt-1 text-gray-400">New image selected: {newProfileImage.name}</p>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {["fullName", "email", "phone", "cnic", "department", "role"].map((key) => (
                <div key={key} className="w-full">
                  <label htmlFor={key} className="block text-sm font-medium mb-1 capitalize">{key}</label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={userInfo[key as keyof typeof userInfo]}
                    onChange={handleChange}
                    placeholder={`Enter ${key}`}
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
                placeholder="Enter organization"
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
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
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
