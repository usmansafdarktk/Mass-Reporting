import React from 'react';
import { FaListAlt, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

import IncomingReportsChart from '../../components/Charts/IncomingReportsChart';
import ResolutionRateChart from '../../components/Charts/ResolutionRateChart';

const OfficerDashboard: React.FC = () => {
  const totalReports = 128;
  const statusCounts = {
    Verified: 62,
    Pending: 34,
    'Under Review': 18,
    Rejected: 14,
  };

  const categoryData = [
    { category: 'Sanitation', count: 45 },
    { category: 'Traffic', count: 30 },
    { category: 'Noise', count: 22 },
    { category: 'Encroachment', count: 31 },
  ];

  return (
    <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.45)] border dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Officer Dashboard</h1>

      {/* Top Summary Stats */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">System Summary</h2>
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4 text-center shadow">
          <FaListAlt className="text-2xl mb-2 text-gray-800 dark:text-white mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-300">Total Reports</p>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{totalReports}</h2>
        </div>
        <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4 text-center shadow">
          <FaCheckCircle className="text-2xl mb-2 text-green-600 mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-300">Verified</p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{statusCounts.Verified}</h2>
        </div>
        <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4 text-center shadow">
          <FaClock className="text-2xl mb-2 text-yellow-500 mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-300">Pending</p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{statusCounts.Pending}</h2>
        </div>
        <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4 text-center shadow">
          <FaTimesCircle className="text-2xl mb-2 text-red-500 mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-300">Rejected</p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{statusCounts.Rejected}</h2>
        </div>
      </div>

      {/* Charts Section */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">System Activity</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <IncomingReportsChart />
        <ResolutionRateChart />
      </div>

      {/* Category Breakdown */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Reports by Category</h2>
      <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
        <ul className="divide-y divide-gray-200 dark:divide-gray-600">
          {categoryData.map((item, index) => (
            <li key={index} className="py-3 flex justify-between">
              <span className="text-gray-700 dark:text-gray-200">{item.category}</span>
              <span className="font-semibold text-gray-800 dark:text-white">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OfficerDashboard;
