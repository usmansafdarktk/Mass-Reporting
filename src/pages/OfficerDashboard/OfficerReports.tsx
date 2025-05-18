import React, { useState } from 'react';
import ReportRow from '../../components/Officer/ReportRow';

interface Report {
  id: string;
  title: string;
  date: string;
  status: 'Pending' | 'Under Review' | 'Verified' | 'Rejected';
  category: string;
}

const mockReports: Report[] = [
  {
    id: 'r001',
    title: 'Illegal construction near Park Lane',
    date: '2025-05-18',
    status: 'Pending',
    category: 'Zoning',
  },
  {
    id: 'r002',
    title: 'Garbage overflow in Model Town',
    date: '2025-05-16',
    status: 'Under Review',
    category: 'Sanitation',
  },
  {
    id: 'r003',
    title: 'Blocked footpath at Main Boulevard',
    date: '2025-05-14',
    status: 'Verified',
    category: 'Infrastructure',
  },
  {
    id: 'r004',
    title: 'Noise violation complaint - Liberty Market',
    date: '2025-05-12',
    status: 'Rejected',
    category: 'Noise',
  },
];

const statusTabs = ['All', 'Pending', 'Under Review', 'Verified', 'Rejected'];

const OfficerReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const filteredReports =
    activeTab === 'All'
      ? mockReports
      : mockReports.filter((r) => r.status === activeTab);

  return (
    <div className="bg-white dark:bg-[#1e293b] p-6 m-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.45)] dark:shadow-none border dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-6">Manage Reports</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {statusTabs.map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === status
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-blue-100 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-blue-600 dark:hover:text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-sm table-auto border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-xs uppercase text-gray-500 dark:text-gray-300 border-b dark:border-gray-600">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-200">
            {filteredReports.map((report) => (
              <ReportRow key={report.id} report={report} />
            ))}
            {filteredReports.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-400 dark:text-gray-500">
                  No reports found for this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfficerReports;
