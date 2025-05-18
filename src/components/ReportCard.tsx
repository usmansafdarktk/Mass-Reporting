import React from "react";
import { useNavigate } from "react-router-dom";

export interface Report {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  status: "Pending" | "Under Review" | "Verified" | "Rejected";
  imagePath: string;
}

interface ReportCardProps {
  report: Report;
  onDelete?: () => void; // Delete stays external
}

const statusColors: Record<Report["status"], string> = {
  Pending: "bg-yellow-400 text-yellow-900",
  "Under Review": "bg-blue-400 text-blue-900",
  Verified: "bg-green-500 text-white",
  Rejected: "bg-red-500 text-white",
};

const ReportCard: React.FC<ReportCardProps> = ({ report, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded-lg shadow-sm bg-white dark:bg-[#24303f] border-[#1c2434] dark:border-gray-500 hover:shadow-md transition cursor-pointer"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={report.imagePath}
          alt={report.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{report.title}</h3>
          <span className={`px-3 py-1 rounded-md text-sm font-semibold ${statusColors[report.status]}`}>
            {report.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">📍 {report.location}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">📅 {report.date}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">📂 {report.category}</p>

        {report.status === "Pending" && (
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user/reports/${report.id}/edit`);
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
