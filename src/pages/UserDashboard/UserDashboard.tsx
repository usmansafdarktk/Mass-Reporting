import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaFlagCheckered, FaCheckDouble, FaFireAlt, FaEye, FaTrophy, FaCheckCircle, FaTimesCircle, FaClock, FaClipboardList } from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';

const mockReports = [
  {
    id: 'r001',
    title: 'Illegal dumping on Canal Road',
    date: '2025-05-10',
    status: 'Verified',
    category: 'Sanitation',
  },
  {
    id: 'r002',
    title: 'Broken streetlight near Liberty',
    date: '2025-05-12',
    status: 'Pending',
    category: 'Infrastructure',
  },
  {
    id: 'r003',
    title: 'Unauthorized construction in Gulberg',
    date: '2025-05-15',
    status: 'Rejected',
    category: 'Building Violation',
  },
];

const statusCounts: Record<string, number> = {
  Total: 24,
  Verified: 14,
  Rejected: 3,
  Pending: 7,
};

const iconMap: Record<string, JSX.Element> = {
  Total: <FaClipboardList className="text-blue-500 text-lg" />,
  Verified: <FaCheckCircle className="text-blue-500 text-lg" />,
  Rejected: <FaTimesCircle className="text-blue-500 text-lg" />,
  Pending: <FaClock className="text-blue-500 text-lg" />,
};

const monthlyStats = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  submitted: [2, 3, 5, 6, 8],
};

const UserDashboard: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Verified' | 'Pending' | 'Rejected'>('All');

  const filteredReports =
    filterStatus === 'All' ? mockReports : mockReports.filter(r => r.status === filterStatus);

  return (
    <div className="min-h-screen px-4 py-10 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* 1. My Reports Summary */}
        <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-[0px_0px_4px_rgba(24,54,178,1)] dark:shadow-none border dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Reports Summary</h2>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-1 border dark:border-gray-600 rounded bg-white dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(statusCounts).map(([label, count]) => (
              <div
                key={label}
                className="bg-gray-100 dark:bg-slate-800 p-4 rounded-md text-center shadow-sm border dark:border-gray-600"
              >
                <div className="flex justify-center mb-2">
                  {iconMap[label]}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                <p className="text-2xl font-bold">{count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Recent Reports Table */}
        <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-[0px_0px_4px_rgba(24,54,178,1)] dark:shadow-none border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="text-left text-xs uppercase text-gray-500 dark:text-gray-300 border-b dark:border-gray-600">
                  <th className="py-2">Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                    <td className="py-3">{report.title}</td>
                    <td>{report.date}</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        report.status === 'Verified' ? 'bg-green-500 text-white' :
                        report.status === 'Pending' ? 'bg-yellow-400 text-yellow-900' :
                        'bg-red-500 text-white'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="flex items-center gap-1"><MdOutlineCategory /> {report.category}</td>
                    <td className="text-center">
                      <button className="text-blue-600 hover:underline flex items-center gap-1 text-sm justify-center">
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. My Contribution Stats */}
        <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-[0px_0px_4px_rgba(24,54,178,1)] dark:shadow-none border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">My Contribution Stats</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ReactApexChart
                type="line"
                height={280}
                series={[{ name: 'Reports Submitted', data: monthlyStats.submitted }]}
                options={{
                  chart: { toolbar: { show: false } },
                  xaxis: { categories: monthlyStats.months },
                  stroke: { curve: 'smooth' },
                  colors: ['#3366cc'],
                }}
              />
            </div>
            <div className="space-y-4">
                <div className="text-lg font-medium flex items-center gap-2">
                    <FaTrophy className="text-yellow-400" /> Rank: <span className="text-blue-600">#12</span> on leaderboard
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Badges Unlocked</h3>
                    <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                        <FaFlagCheckered className="text-blue-500" />
                        First 10 Reports
                    </li>
                    <li className="flex items-center gap-2">
                        <FaCheckDouble className="text-green-500" />
                        5 Reports Verified
                    </li>
                    <li className="flex items-center gap-2">
                        <FaFireAlt className="text-red-500" />
                        Active Reporter (5+ this month)
                    </li>
                    </ul>
                </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default UserDashboard;
