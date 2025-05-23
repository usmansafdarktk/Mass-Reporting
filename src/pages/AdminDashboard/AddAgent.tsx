import React, { useState } from "react";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { addOfficer } from "../../utils/addAgent";

const AddAgent: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    designation: "",
    department: "",
    profilePicture: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");

      try {
        await addOfficer(
          formData.name,
          formData.email,
          formData.phone,
          formData.department,   // treated as organization
          formData.designation,
          formData.cnic
        );

        setMessage("Officer added successfully. A password reset email has been sent.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          cnic: "",
          designation: "",
          department: "",
          profilePicture: null,
        });
      } catch (error: any) {
        setMessage("Failed to add officer: " + error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (

    <div className="flex flex-col">
    <button
        onClick={() => navigate('/admin/agents')}
        className="text-lg mb-6 focus:outline-none mx-4"
      >
        <FaArrowLeft className="text-2xl text-black dark:text-white hover:opacity-80" />
      </button>

      <div className="flex justify-center items-start min-h-screen bg-gray-100 dark:bg-transparent px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-[#1e293b] dark:border dark:border-gray-600 p-8 rounded-lg dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)] text-black dark:text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Agent</h2>
        {message && <p className="text-center mb-4 text-green-600 dark:text-green-400">{message}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Row 1: Name and Email */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Officer Ali"
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. officer@police.gov"
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Row 2: Designation and Department */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label htmlFor="designation" className="block text-sm font-medium">Designation</label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Sub Inspector"
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="department" className="block text-sm font-medium">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Traffic Police"
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Row 3: Phone and CNIC */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 0300-1234567"
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="cnic" className="block text-sm font-medium">CNIC</label>
              <input
                type="text"
                id="cnic"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                placeholder="e.g. 35201-1234567-1"
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#1836b2] text-white font-semibold rounded-md hover:bg-[#10259b] transition-all"
          >
            {loading ? "Adding..." : "Add Agent"}
          </button>
        </form>
      </div>
    </div>
    </div>
    
  );
};

export default AddAgent;
