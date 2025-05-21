import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import UnassignedReportRow from '../../components/Officer/UnassignedReportRow';
import { fetchUnassignedReports } from '../../utils/officerReporting';
import { claimReport } from '../../utils/officerReporting';

type Report = {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  category: string;
  status: 'pending' | 'under review';
  image: string;
};

const UnassignedReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchUnassignedReports();
        setReports(data);
      } catch (err) {
        console.error('Error loading reports:', err);
        toast.error('Failed to load reports');
      }
    };

    loadReports();
  }, []);

  const handleClaim = async (id: string) => {
    try {
      await claimReport(id); 
      setReports(prev =>
        prev.map(report =>
          report.id === id
            ? { ...report, status: 'under review' }
            : report
        )
      ); 
      toast.success("Report claimed!");
    } catch (err) {
      console.error("Claim failed:", err);
      toast.error("Failed to claim report.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-black dark:text-white font-bold mb-6">Unassigned Reports</h1>

      {/* Filters - Placeholder UI */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl mb-8 shadow-md border dark:border-gray-700">
        <div className="flex flex-wrap gap-4 items-end">
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
      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-md border dark:border-gray-700">
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
            {reports.map(report => (
              <UnassignedReportRow key={report.id} report={report} onClaim={handleClaim} />
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
