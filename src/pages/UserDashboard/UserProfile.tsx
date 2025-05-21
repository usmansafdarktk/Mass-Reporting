import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import { logoutUser, getCitizenProfile, updateCitizenProfile } from "../../utils/userauth";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    cnic: "",
    profileImage: "/images/user-profile.png",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCitizenProfile();
        if (data) setUserInfo(prev => ({ ...prev, ...data }));
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProfileImage(file);
      setUserInfo(prev => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleUpdate = async () => {
  try {
    setLoading(true); 

    let profileImageUrl = userInfo.profileImage;
    if (newProfileImage) {
      profileImageUrl = await uploadToCloudinary(newProfileImage);
    }

    await updateCitizenProfile({
      ...userInfo,
      profileImage: profileImageUrl,
    });

    setUserInfo(prev => ({ ...prev, profileImage: profileImageUrl }));
    setIsEditing(false);
  } catch (err) {
    alert("Profile update failed.");
  } finally {
    setLoading(false); 
  }
};

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      alert("Logout failed");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-[#1e293b] border dark:border-gray-600 p-8 rounded-lg shadow-md text-black dark:text-white">
        <h2 className="text-3xl font-bold mb-8">My Profile</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={userInfo.profileImage || "/images/user-profile.png"}
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover border-2 border-blue-600"
          />
        </div>

        {/* Overview */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {userInfo.fullName && (
              <div className="flex flex-1 items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                <FaUser className="text-xl text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Full Name</p>
                  <p className="font-semibold">{userInfo.fullName}</p>
                </div>
              </div>
            )}
            {userInfo.email && (
              <div className="flex flex-1 items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                <FaEnvelope className="text-xl text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Email</p>
                  <p className="font-semibold">{userInfo.email}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {userInfo.phone && (
              <div className="flex flex-1 items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                <FaPhone className="text-xl text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Phone</p>
                  <p className="font-semibold">{userInfo.phone}</p>
                </div>
              </div>
            )}
            {userInfo.cnic && (
              <div className="flex flex-1 items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                <FaIdCard className="text-xl text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">CNIC</p>
                  <p className="font-semibold">{userInfo.cnic}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-6 border-t border-gray-300 pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>

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

            {/* Editable fields */}
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" name="fullName" value={userInfo.fullName} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-2 border rounded-md" />
              <input type="email" name="email" value={userInfo.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input type="tel" name="phone" value={userInfo.phone} onChange={handleChange} placeholder="Phone" className="w-full px-4 py-2 border rounded-md" />
              <input type="text" name="cnic" value={userInfo.cnic} onChange={handleChange} placeholder="CNIC" className="w-full px-4 py-2 border rounded-md" />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white"  disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
            </div>
          </form>
        )}

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex justify-end gap-4 mt-8">
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-gray-300">Edit Profile</button>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
