import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';

const ReportViolation: React.FC = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    dateTime: "",
    location: "",
    media: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, media: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Placeholder logic for form submission
    console.log("Submitting Violation Report:", formData);

    setTimeout(() => {
      setMessage("Violation report submitted successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        dateTime: "",
        location: "",
        media: null,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col">
      <button
                    onClick={() => navigate('/user/dashboard')}
                    className="text-lg mb-6 focus:outline-none mx-4"
                  >
                    <FaArrowLeft className="text-2xl text-black dark:text-white hover:opacity-80" />
      </button>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-transparent px-4">
        <div className="w-full max-w-4xl bg-white dark:bg-[#1e293b] dark:border dark:border-gray-600 p-8 rounded-lg dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)] text-black dark:text-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">Report Traffic Violation</h2>
          {message && <p className="text-center mb-4 text-green-600 dark:text-green-400">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Title and Category */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="title" className="block text-sm font-medium">Violation Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Wrong Parking"
                  className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="category" className="block text-sm font-medium">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Speeding, Red Light"
                  className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what happened..."
                rows={4}
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Row 2: Date/Time and Location */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="dateTime" className="block text-sm font-medium">Date & Time</label>
                <input
                  type="datetime-local"
                  id="dateTime"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="location" className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter or auto-detect location"
                  className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label htmlFor="media" className="block text-sm font-medium">Upload Image or Video</label>
              <input
                type="file"
                id="media"
                name="media"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-white hover:file:bg-blue-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full py-2 px-4 bg-[#1836b2] text-white font-semibold rounded-md hover:bg-[#10259b] transition-all"
            >
              {loading ? "Submitting..." : "Submit Violation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportViolation;
