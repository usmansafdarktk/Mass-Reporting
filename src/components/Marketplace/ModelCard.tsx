import React from 'react';
import { FiCpu } from 'react-icons/fi';

type ModelProps = {
  model: {
    id: string;
    name: string;
    description: string;
    type: string;
    status: 'Approved' | 'Pending Review';
    version: string;
    contributor: string;
    tags: string[];
  };
};

const tagColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-yellow-100 text-yellow-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
  'bg-red-100 text-red-800',
  'bg-indigo-100 text-indigo-800',
];

const ModelCard: React.FC<ModelProps> = ({ model }) => {
  const statusColor =
    model.status === 'Approved'
      ? 'bg-green-500 text-white'
      : 'bg-yellow-300 text-yellow-900';

  return (
    <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border dark:border-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.45)] flex flex-col gap-4">
      {/* Title and Status */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiCpu className="text-blue-600" /> {model.name}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}>
          {model.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
        {model.description}
      </p>

      {/* Metadata */}
      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
        <p><strong>Type:</strong> {model.type}</p>
        <p><strong>Version:</strong> {model.version}</p>
        <p><strong>Contributor:</strong> {model.contributor}</p>
      </div>

      {/* Colorful Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {model.tags.map((tag, i) => {
          const color = tagColors[i % tagColors.length];
          return (
            <span
              key={i}
              className={`text-xs font-medium px-2 py-1 rounded-md ${color} shadow-sm`}
            >
              #{tag}
            </span>
          );
        })}
      </div>

      {/* View Button */}
      <div className="mt-4 flex justify-end">
        <button className="px-4 py-1.5 rounded bg-gray-800 text-white text-sm hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ModelCard;
