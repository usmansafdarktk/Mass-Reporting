import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineCategory, MdLocationOn, MdDateRange } from 'react-icons/md';
import { FaClock, FaUserShield, FaArrowLeft } from 'react-icons/fa';
import { getReportById } from '../../utils/officerReporting';
import { toast } from 'react-hot-toast';
import { updateReportStatus } from '../../utils/officerReporting';

const ReportDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        if (id) {
          const data = await getReportById(id);
          setReport(data);
        }
      } catch (err) {
        console.error("Error loading report:", err);
        toast.error("Failed to load report details.");
      }
    };
    loadReport();
  }, [id]);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-400 text-yellow-900',
    'under review': 'bg-blue-400 text-blue-900',
    verified: 'bg-green-500 text-white',
    rejected: 'bg-red-500 text-white',
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newStatus = e.target.value;

      try {
        if (!report?.id) throw new Error("Report ID not found");

        await updateReportStatus(report.id, newStatus);

        setReport((prev: any) => ({ ...prev, status: newStatus }));
        toast.success("Status updated successfully!");
      } catch (error) {
        console.error("Failed to update status:", error);
        toast.error("Failed to update report status");
      }
    };

  if (!report) {
    return <p className="text-center mt-10 text-gray-500 dark:text-gray-400">Loading report...</p>;
  }

  // Extract date & time from ISO string
  const [date, time] = report.dateTime?.split('T') || ['', ''];
  const formattedTime = time ? time.slice(0, 5) : '';

  return (
    <div className="flex flex-col m-4">
      <button onClick={() => navigate('/officer/reports')} className="text-lg mb-6 focus:outline-none">
        <FaArrowLeft className="text-2xl text-black dark:text-white hover:opacity-80" />
      </button>

      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-md border dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-6">Report Details</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">{report.title}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">{report.description}</p>
          </div>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p className="flex items-center gap-2"><MdOutlineCategory className="text-lg" /><strong>Category:</strong> {report.category}</p>
            <p className="flex items-center gap-2"><MdDateRange className="text-lg" /><strong>Date:</strong> {date}</p>
            <p className="flex items-center gap-2"><FaClock className="text-lg" /><strong>Time:</strong> {formattedTime}</p>
            <p className="flex items-center gap-2"><MdLocationOn className="text-lg" /><strong>Location:</strong> {report.location}</p>
            <p className="flex items-center gap-2"><FaUserShield className="text-lg" /><strong>Submitted By:</strong> {report.submittedBy || 'Citizen'}</p>
            <p><strong>Status:</strong>{' '}
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[report.status]}`}>
                {report.status}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Attached Media</h3>
          {report.mediaUrl ? (
            <img
              src={report.mediaUrl}
              alt="Report Evidence"
              className="w-full max-w-md h-64 object-cover rounded border border-gray-300 dark:border-gray-600"
            />
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No media attached.</p>
          )}
        </div>

        {report.status === 'under review' && (
          <div className="mt-10 flex flex-col items-start gap-2">
            <label htmlFor="status" className="text-sm font-semibold mb-1 text-gray-800 dark:text-white">Change Report Status</label>
            <select
              id="status"
              onChange={handleStatusChange}
              value={report.status}
              className="px-4 py-2 rounded-md border bg-gray-800 text-white text-sm"
            >
              <option value="under review">Under Review</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetailPage;
