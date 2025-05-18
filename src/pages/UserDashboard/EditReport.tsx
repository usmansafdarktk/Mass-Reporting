import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Report } from "../../components/ReportCard";

const mockReports: Report[] = [
  {
    id: "1",
    title: "Speeding in school zone",
    category: "Speeding",
    location: "Main Blvd, Lahore",
    date: "2024-12-10",
    status: "Pending",
    imagePath: "/images/complaint1.jpg",
  },
  {
    id: "2",
    title: "Illegal Parking",
    category: "Wrong Parking",
    location: "F-8 Markaz, Islamabad",
    date: "2024-12-08",
    status: "Under Review",
    imagePath: "/images/complaint2.jpg",
  },
  {
    id: "3",
    title: "Blocking Intersection",
    category: "Obstruction",
    location: "Shahrah-e-Faisal, Karachi",
    date: "2024-12-05",
    status: "Verified",
    imagePath: "/images/complaint3.jpg",
  },
];

const EditReport: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const reportToEdit = mockReports.find((r) => r.id === id);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    media: null as File | null,
  });

  useEffect(() => {
    if (reportToEdit) {
      setFormData((prev) => ({
        ...prev,
        title: reportToEdit.title,
        category: reportToEdit.category,
        location: reportToEdit.location,
        date: reportToEdit.date,
      }));
    }
  }, [reportToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      media: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedReport = {
      ...reportToEdit,
      ...formData,
      imagePath: formData.media ? URL.createObjectURL(formData.media) : reportToEdit?.imagePath,
    };
    console.log("Updated Report:", updatedReport);
    navigate("/user/reports");
  };

  if (!reportToEdit) {
    return <div className="text-center mt-20 text-red-600">Report not found.</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-transparent px-4">
        <div className="w-full max-w-4xl bg-white dark:bg-[#1e293b] dark:border dark:border-gray-600 p-8 rounded-lg dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)] text-black dark:text-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">Edit Report</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              >
                <option value="">Select category</option>
                <option value="Speeding">Speeding</option>
                <option value="Wrong Parking">Wrong Parking</option>
                <option value="Obstruction">Obstruction</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Media Upload */}
            <div>
              <label htmlFor="media" className="block text-sm font-medium">Upload New Media</label>
              <input
                type="file"
                id="media"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-white hover:file:bg-blue-100"
              />
              {/* Current media preview */}
              {reportToEdit.imagePath && (
                <img
                  src={reportToEdit.imagePath}
                  alt="Current"
                  className="mt-4 rounded-md w-full h-52 object-cover"
                />
              )}
              {/* New media preview */}
              {formData.media && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                  New file selected: {formData.media.name}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditReport;
