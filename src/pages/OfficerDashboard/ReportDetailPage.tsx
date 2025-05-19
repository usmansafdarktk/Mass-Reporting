import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineCategory, MdLocationOn, MdDateRange } from 'react-icons/md';
import { FaClock, FaUserShield, FaArrowLeft } from 'react-icons/fa';

const ReportDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState({
    id,
    title: 'Illegal construction near Park Lane',
    description:
      'Unapproved construction blocking the sidewalk and access to neighboring homes. No safety barriers or visible permits.',
    status: 'Under Review',
    category: 'Zoning',
    date: '2025-05-18',
    time: '14:30',
    district: 'Lahore',
    submittedBy: 'Citizen Reporter',
    evidence: ['/images/complaint1.jpg', '/images/complaint2.jpg'],
  });

  const statusColors: Record<string, string> = {
    Pending: 'bg-yellow-400 text-yellow-900',
    'Under Review': 'bg-blue-400 text-blue-900',
    Verified: 'bg-green-500 text-white',
    Rejected: 'bg-red-500 text-white',
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as 'Under Review' | 'Verified' | 'Rejected';
    setReport((prev) => ({ ...prev, status: newStatus }));
  };

  return (
    <div className="flex flex-col m-4">
      <button
        onClick={() => navigate('/officer/reports')}
        className="text-lg mb-6 focus:outline-none"
      >
        <FaArrowLeft className="text-2xl text-black dark:text-white hover:opacity-80" />
      </button>

      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.45)] dark:shadow-none border dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-6">Report Details</h1>

        {/* Metadata */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">{report.title}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">{report.description}</p>
          </div>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p className="flex items-center gap-2">
              <MdOutlineCategory className="text-lg" /> <strong>Category:</strong> {report.category}
            </p>
            <p className="flex items-center gap-2">
              <MdDateRange className="text-lg" /> <strong>Date:</strong> {report.date}
            </p>
            <p className="flex items-center gap-2">
              <FaClock className="text-lg" /> <strong>Time:</strong> {report.time}
            </p>
            <p className="flex items-center gap-2">
              <MdLocationOn className="text-lg" /> <strong>District:</strong> {report.district}
            </p>
            <p className="flex items-center gap-2">
              <FaUserShield className="text-lg" /> <strong>Submitted By:</strong> {report.submittedBy}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[report.status]}`}
              >
                {report.status}
              </span>
            </p>
          </div>
        </div>

        {/* Evidence */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Attached Media</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.evidence.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Evidence ${idx + 1}`}
                className="w-full h-64 object-cover rounded border border-gray-300 dark:border-gray-600"
              />
            ))}
          </div>
        </div>

        {/* Change Status (footer) */}
        {report.status === 'Under Review' && (
          <div className="mt-10 flex flex-col items-start gap-2">
            <label htmlFor="status" className="text-sm font-semibold mb-1 text-gray-800 dark:text-white">
              Change Report Status
            </label>
            <select
              id="status"
              onChange={handleStatusChange}
              value={report.status}
              className="px-4 py-2 rounded-md border border-gray-400 dark:border-gray-500 bg-gray-800 dark:bg-blue-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Under Review">Under Review</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              This will notify the citizen and update the report workflow.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetailPage;
