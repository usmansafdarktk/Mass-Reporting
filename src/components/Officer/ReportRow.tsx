import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';

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

interface Props {
  report: Report;
}

const statusColors: Record<Report['status'], string> = {
  pending: 'bg-yellow-400 text-yellow-900',
  'under review': 'bg-blue-400 text-blue-900',
  verified: 'bg-green-500 text-white',
  rejected: 'bg-red-500 text-white',
};

const ReportRow: React.FC<Props> = ({ report }) => {
  return (
    <tr className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition">
      <td className="px-4 py-4">{report.title}</td>
      <td className="px-4 py-4">{report.date}</td>
      <td className="px-4 py-4 flex items-center gap-1">
        <MdOutlineCategory /> {report.category}
      </td>
      <td className="px-4 py-4">
        <span
          className={`px-2 py-1 whitespace-nowrap rounded text-xs font-medium ${statusColors[report.status]}`}
        >
          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-wrap gap-3">
          <Link
            to={`/officer/reports/${report.id}`}
            className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            <FaEye /> View
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ReportRow;
