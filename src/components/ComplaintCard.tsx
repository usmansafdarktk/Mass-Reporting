import React from 'react';

interface ComplaintCardProps {
  imagePath: string;
  title: string;
  description: string;
  date: string;
  status: 'Open' | 'In Progress' | 'Resolved';
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({
  imagePath,
  title,
  description,
  date,
  status,
}) => {
  const statusColors = {
    Open: 'bg-red-500',
    'In Progress': 'bg-yellow-500',
    Resolved: 'bg-green-500',
  };

  return (
    <div className="bg-white dark:bg-[#24303f] border border-[#1c2434] dark:border-gray-500 shadow-lg rounded-lg overflow-hidden w-full max-w-sm mx-auto transition-colors duration-300">
      {/* Image Section */}
      <div className="relative">
        <img className="w-full h-48 object-cover" src={imagePath} alt="Complaint" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="currentColor"
            className="bi bi-play"
            viewBox="0 0 16 16"
          >
            <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z" />
          </svg>
        </div>
      </div>

      {/* Text Section */}
      <div className="p-4">
        <div
          className={`text-white text-sm font-semibold px-3 py-1 inline-block rounded-md mb-3 ${statusColors[status]}`}
        >
          {status}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{description}</p>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          <strong>Date:</strong> {date}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <strong>Reported By:</strong> citizen_user_123
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
