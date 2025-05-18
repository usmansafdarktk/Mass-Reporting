import React from 'react';

interface InspectorProfileCardProps {
  imagePath: string;
  name: string;
  rank: string;
  department: string;
  contactInfo: string;
  bio: string;
  totalComplaints: number;
  complaintsStatus: {
    open: number;
    inProgress: number;
    resolved: number;
  };
}

const InspectorProfileCard: React.FC<InspectorProfileCardProps> = ({
  imagePath,
  name,
  rank,
  department,
  contactInfo,
  totalComplaints,
  complaintsStatus,
}) => {
  return (
    <div className="bg-white dark:bg-[#24303f] border border-[#1c2434] dark:border-gray-600 shadow-lg rounded-lg w-full max-w-xs mx-auto p-4 transition duration-300">
      {/* Image */}
      <div className="flex justify-center mb-4">
        <img
          src={imagePath}
          alt={`${name}'s photo`}
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
      </div>

      {/* Info */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{rank}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{department}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{contactInfo}</p>
      </div>

      {/* Complaints Overview */}
      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mt-4">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Complaints Overview</h4>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Total Complaints:</span>
          <span className="font-semibold">{totalComplaints}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-600 dark:text-gray-300">Open:</span>
          <span className="font-semibold text-red-500">{complaintsStatus.open}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-600 dark:text-gray-300">In Progress:</span>
          <span className="font-semibold text-yellow-500">{complaintsStatus.inProgress}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-600 dark:text-gray-300">Resolved:</span>
          <span className="font-semibold text-green-500">{complaintsStatus.resolved}</span>
        </div>
      </div>
    </div>
  );
};

export default InspectorProfileCard;
