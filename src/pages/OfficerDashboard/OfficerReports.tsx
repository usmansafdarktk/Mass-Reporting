import React, { useEffect, useState } from 'react';
import ReportRow from '../../components/Officer/ReportRow';
import { fetchOfficerReports } from '../../utils/officerReporting'; // ✅ Your dynamic fetch function
import { toast } from 'react-hot-toast';

interface Report {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  category: string;
  status: 'pending' | 'under review' | 'verified' | 'rejected';
  image: string;
}

const statusTabs: string[] = ['all', 'pending', 'under review', 'verified', 'rejected'];

const OfficerReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        const data = await fetchOfficerReports(); // 🔁 Officer-specific reports from Firestore
        setReports(data);
      } catch (err) {
        console.error('Error fetching officer reports:', err);
        toast.error('Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const filteredReports = activeTab === 'all'
    ? reports
    : reports.filter((r) => r.status === activeTab);

  return (
    <div className="bg-white dark:bg-[#1e293b] p-6 m-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.45)] dark:shadow-none border dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Manage Reports</h1>

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
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-sm table-auto border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-xs uppercase text-gray-500 dark:text-gray-300 border-b dark:border-gray-600">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-200">
            {filteredReports.map((report) => (
              <ReportRow key={report.id} report={report} />
            ))}
            {!loading && filteredReports.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-400 dark:text-gray-500">
                  No reports found for this status.
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-500 dark:text-gray-400">
                  Loading reports...
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
