import React, { useState } from 'react';
import { FiEye, FiCheckCircle, FiMapPin, FiFilter } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

type Report = {
  id: string;
  title: string;
  district: string;
  street: string;
  date: string;
  time: string;
  category: string;
  status: 'Unassigned' | 'Under Review';
  image: string;
};

const dummyReports: Report[] = [
  {
    id: 'r101',
    title: 'Illegal dumping near Model Town Park',
    district: 'Lahore',
    street: 'Ferozepur Road',
    date: '2025-05-17',
    time: '12:30',
    category: 'Sanitation',
    status: 'Unassigned',
    image: '/images/complaint1.jpg',
  },
  {
    id: 'r102',
    title: 'Noise pollution from construction site',
    district: 'Karachi',
    street: 'Block 7, Gulshan',
    date: '2025-05-18',
    time: '08:50',
    category: 'Noise',
    status: 'Unassigned',
    image: '/images/complaint2.jpg',
  },
];

const UnassignedReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(dummyReports);
//   const [filters, setFilters] = useState({ district: '', category: '', sort: 'recent' });

  const handleClaim = (id: string) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, status: 'Under Review' } : report
      )
    );
    toast.success('Report assigned successfully and moved to Under Review!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-black dark:text-white font-bold mb-6">Unassigned Reports</h1>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl mb-8 shadow-[0_2px_8px_rgba(0,0,0,0.45)] border dark:border-gray-700">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">District</label>
            <select className="w-full px-3 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
              <option value="">All</option>
              <option>Lahore</option>
              <option>Karachi</option>
              <option>Rawalpindi</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select className="w-full px-3 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
              <option value="">All</option>
              <option>Sanitation</option>
              <option>Traffic</option>
              <option>Noise</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select className="w-full px-3 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
              <option value="recent">Recent First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          <button className="mt-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 flex items-center gap-2">
            <FiFilter /> Apply
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.45)] border dark:border-gray-700">
            <table className="w-full text-sm table-auto">
                <thead>
                <tr className="text-left text-xs text-gray-500 dark:text-gray-300 border-b dark:border-gray-600">
                    <th className="py-4 px-3">Title</th>
                    <th className="py-4 px-3">Date & Time</th>
                    <th className="py-4 px-3">Location</th>
                    <th className="py-4 px-3">Status</th>
                    <th className="py-4 px-3">Category</th>
                    <th className="py-4 px-3 text-center">Evidence</th>
                    <th className="py-4 px-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {reports.map((report) => (
                    <tr
                    key={report.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                    >
                    <td className="py-5 px-3 font-medium text-gray-800 dark:text-white">{report.title}</td>
                    <td className="py-5 px-3 text-gray-700 dark:text-gray-300">
                        {report.date} <br /> <span className="text-xs">{report.time}</span>
                    </td>
                    <td className="py-5 px-3 text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                        <FiMapPin className="text-gray-500" />
                        <span>
                            {report.district}
                            <br />
                            <span className="text-xs text-gray-500">{report.street}</span>
                        </span>
                        </div>
                    </td>
                    <td className="py-5 px-3">
                        <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${
                            report.status === 'Unassigned'
                            ? 'bg-yellow-300 text-yellow-900'
                            : 'bg-blue-500 text-white'
                        }`}
                        >
                        {report.status}
                        </span>
                    </td>
                    <td className="py-5 px-3 text-gray-700 dark:text-gray-300">{report.category}</td>
                    <td className="py-5 px-3 text-center">
                        <img
                        src={report.image}
                        alt="Evidence"
                        className="w-14 h-14 rounded-md object-cover border border-gray-300 dark:border-gray-600 mx-auto"
                        />
                    </td>
                    <td className="py-5 px-3">
                        <div className="flex gap-4">
                        <Link to={`/officer/reports/${report.id}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            <FiEye /> View
                        </Link>
                        {report.status === 'Unassigned' && (
                            <button
                            onClick={() => handleClaim(report.id)}
                            className="text-sm text-green-600 hover:underline flex items-center gap-1"
                            >
                            <FiCheckCircle /> Claim
                            </button>
                        )}
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {reports.length === 0 && (
                <p className="text-center py-10 text-gray-500 dark:text-gray-400">
                No unassigned reports found.
                </p>
            )}
        </div>
    </div>
  );
};

export default UnassignedReports;
