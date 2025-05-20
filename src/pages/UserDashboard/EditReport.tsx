import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getReportById, updateViolationReport } from "../../utils/reporting";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { Report } from "../../components/ReportCard";

const EditReport: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [reportToEdit, setReportToEdit] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    media: null as File | null,
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        if (id) {
          const report = await getReportById(id);
          setReportToEdit(report);
          setFormData({
            title: report.title,
            description: report.description || "",
            category: report.category,
            location: report.location,
            date: report.date,
            media: null,
          });
        }
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportToEdit || !id) return;

    try {
      setSubmitting(true);
      let mediaUrl = reportToEdit.imagePath;

      if (formData.media) {
        mediaUrl = await uploadToCloudinary(formData.media);
      }

      await updateViolationReport(id, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        dateTime: formData.date,
        mediaUrl,
      });

      navigate("/user/my-reports");
    } catch (error: any) {
      console.error("Error updating report:", error.message);
      alert("Failed to update report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-blue-600">Loading...</div>;
  }

  if (!reportToEdit) {
    return <div className="text-center mt-20 text-red-600">Report not found.</div>;
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={() => navigate("/user/my-reports")}
        className="text-lg mb-6 focus:outline-none mx-4"
      >
        <FaArrowLeft className="text-2xl text-black dark:text-white hover:opacity-80" />
      </button>
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
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white"
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
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white"
                required
              >
                <option value="" disabled>Select a category</option>
                <option value="Speeding">Speeding</option>
                <option value="Signal Violation">Signal Violation</option>
                <option value="Wrong Parking">Wrong Parking</option>
                <option value="Illegal U-Turn">Illegal U-Turn</option>
                <option value="Driving on Wrong Lane">Driving on Wrong Lane</option>
                <option value="No Helmet">No Helmet</option>
                <option value="Reckless Driving">Reckless Driving</option>
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
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white"
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
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-800 dark:text-white"
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
              {reportToEdit.imagePath && !formData.media && (
                <img
                  src={reportToEdit.imagePath}
                  alt="Current"
                  className="mt-4 rounded-md w-full h-52 object-cover"
                />
              )}
              {formData.media && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                  New file selected: {formData.media.name}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditReport;
