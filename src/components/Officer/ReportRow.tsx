import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaSyncAlt } from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';
import { RiSpam2Line } from 'react-icons/ri';

interface Props {
  report: {
    id: string;
    title: string;
    date: string;
    status: string;
    category: string;
  };
}

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-400 text-yellow-900',
  'Under Review': 'bg-blue-400 text-blue-900',
  Verified: 'bg-green-500 text-white',
  Rejected: 'bg-red-500 text-white',
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
          {report.status}
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
          <button className="flex items-center gap-1 text-gray-700 hover:underline dark:text-gray-300 text-sm">
            <FaSyncAlt /> Status
          </button>
          <button className="flex items-center gap-1 text-red-500 hover:underline text-sm">
            <RiSpam2Line /> Mark Spam
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ReportRow;
