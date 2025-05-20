import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPinIcon,
  CalendarDaysIcon,
  FolderOpenIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

export interface Report {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  status: "pending" | "under review" | "verified" | "rejected";
  imagePath: string;
}

interface ReportCardProps {
  report: Report;
  onDelete?: () => void;
}

const statusColors: Record<Report["status"], string> = {
  pending: "bg-yellow-400 text-yellow-900",
  "under review": "bg-blue-400 text-blue-900",
  verified: "bg-green-500 text-white",
  rejected: "bg-red-500 text-white",
};

const ReportCard: React.FC<ReportCardProps> = ({ report, onDelete }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {/* Card */}
      <div className="border rounded-lg shadow-sm bg-white dark:bg-[#24303f] border-[#1c2434] dark:border-gray-500 hover:shadow-md transition cursor-pointer relative">
        {/* Image with Status Badge */}
        <div className="relative">
          <img
            src={report.imagePath}
            alt={report.title}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <span
            className={`absolute top-2 right-2 px-3 py-1 rounded-md text-sm font-semibold shadow-md ${statusColors[report.status]}`}
          >
            {report.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{report.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-pink-600" />
            {report.location}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <CalendarDaysIcon className="h-4 w-4 text-blue-500" />
            {report.date}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <FolderOpenIcon className="h-4 w-4 text-yellow-600" />
            {report.category}
          </p>

          {/* Edit/Delete for Pending Only */}
          {report.status === "pending" && (
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/user/reports/${report.id}/edit`);
                }}
                className="flex items-center text-sm text-blue-600 hover:underline"
              >
                <PencilSquareIcon className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(true);
                }}
                className="flex items-center text-sm text-red-500 hover:underline"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this report?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  onDelete?.();
                }}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportCard;
