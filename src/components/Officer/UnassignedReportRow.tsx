import React from 'react';
import { FiCheckCircle, FiMapPin } from 'react-icons/fi';

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

type Props = {
  report: Report;
  onClaim: (id: string) => void;
};

const UnassignedReportRow: React.FC<Props> = ({ report, onClaim }) => {
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition">
      <td className="py-5 px-3 font-medium text-gray-800 dark:text-white">{report.title}</td>
      <td className="py-5 px-3 text-gray-700 dark:text-gray-300">
        {report.date} <br />
        <span className="text-xs">{report.time}</span>
      </td>
      <td className="py-5 px-3 text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <FiMapPin className="text-gray-500" />
          <span className="text-sm">{report.location}</span>
        </div>
      </td>
      <td className="py-5 px-3">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${
            report.status === 'pending'
              ? 'bg-yellow-300 text-yellow-900'
              : 'bg-blue-500 text-white'
          }`}
        >
          {report.status === 'pending' ? 'Unassigned' : 'Under Review'}
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
        {report.status === 'pending' && (
          <button
            onClick={() => onClaim(report.id)}
            className="text-sm text-green-600 hover:underline flex items-center gap-1"
          >
            <FiCheckCircle /> Claim
          </button>
        )}
      </td>
    </tr>
  );
};

export default UnassignedReportRow;
