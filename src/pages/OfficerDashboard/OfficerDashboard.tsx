import React from 'react';
import { FaListAlt, FaCheckCircle, FaClock, FaTimesCircle, FaTrash, FaCarCrash, FaVolumeUp, FaTools } from 'react-icons/fa';


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
  { category: 'Sanitation', count: 45, icon: <FaTrash className="text-gray-600 dark:text-gray-300" /> },
  { category: 'Traffic', count: 30, icon: <FaCarCrash className="text-gray-600 dark:text-gray-300" /> },
  { category: 'Noise', count: 22, icon: <FaVolumeUp className="text-gray-600 dark:text-gray-300" /> },
  { category: 'Encroachment', count: 31, icon: <FaTools className="text-gray-600 dark:text-gray-300" /> },
  ];

  return (
    <div className="p-6 flex flex-col gap-y-12">
      {/* Top Summary Stats */}
      <div className='bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.45)] border dark:border-gray-700'>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-8">System Summary</h2>
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-gray-100 dark:bg-boxdark border border-gray-300 dark:border-gray-500 rounded-lg p-4 text-center shadow">
          <FaListAlt className="text-2xl mb-2 text-gray-800 dark:text-white mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-300">Total Reports</p>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{totalReports}</h2>
        </div>
        <div className="bg-gray-100 dark:bg-boxdark border border-gray-300 dark:border-gray-500 rounded-lg p-4 text-center shadow">
          <FaCheckCircle className="text-2xl mb-2 text-green-600 mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-300">Verified</p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{statusCounts.Verified}</h2>
        </div>
        <div className="bg-gray-100 dark:bg-boxdark border border-gray-300 dark:border-gray-500 rounded-lg p-4 text-center shadow">
          <FaClock className="text-2xl mb-2 text-yellow-500 mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-300">Pending</p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{statusCounts.Pending}</h2>
        </div>
        <div className="bg-gray-100 dark:bg-boxdark border border-gray-300 dark:border-gray-500 rounded-lg p-4 text-center shadow">
          <FaTimesCircle className="text-2xl mb-2 text-red-500 mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-300">Rejected</p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{statusCounts.Rejected}</h2>
        </div>
      </div>
      </div>
      
      <div className='bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.45)] border dark:border-gray-700'>
        {/* Charts Section */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">System Activity</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <IncomingReportsChart />
          <ResolutionRateChart />
        </div>
      </div>

      <div className='bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.45)] border dark:border-gray-700'>
        {/* Category Breakdown */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Reports by Category</h2>
        <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          <ul className="divide-y divide-gray-200 dark:divide-gray-600">
            {categoryData.map((item, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  {item.icon}
                  <span>{item.category}</span>
                </div>
                <span className="font-semibold text-gray-800 dark:text-white">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
