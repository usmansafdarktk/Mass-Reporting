import React, { useState } from 'react';
import ModelCard from '../../components/Marketplace/ModelCard';
import { FiSearch, FiFilter } from 'react-icons/fi';


type Model = {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'Approved' | 'Pending Review';
  version: string;
  contributor: string;
  tags: string[];
};

const dummyModels: Model[] = [
  {
    id: 'm1',
    name: 'Illegal Parking Detector',
    description: 'Detects illegal parking behavior in real-time using YOLOv8.',
    type: 'Parking',
    status: 'Approved',
    version: 'v1.2.3',
    contributor: 'AI Vision Labs',
    tags: ['YOLO', 'Parking'],
  },
  {
    id: 'm2',
    name: 'Mobile Phone Use Detection',
    description: 'Detects if drivers are using phones while driving from dashcam footage.',
    type: 'Distraction',
    status: 'Pending Review',
    version: 'v0.9.1',
    contributor: 'SafeDrive AI',
    tags: ['Mobile Detection', 'Distraction'],
  },
  {
    id: 'm3',
    name: 'Red Light Violation Tracker',
    description: 'Detects vehicles crossing signals after red light activation.',
    type: 'Signal Violation',
    status: 'Approved',
    version: 'v2.0.0',
    contributor: 'TrafficNet',
    tags: ['Red Light', 'YOLO'],
  },
];

const ModelMarketplace: React.FC = () => {
  const [filter, setFilter] = useState('');
  const filteredModels = dummyModels.filter((model) =>
    model.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="px-6 py-8 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">ML Model Marketplace</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
        Explore and manage machine learning models contributed by trusted developers to enhance violation detection. Admins can validate, review, and deploy approved models into the live detection pipeline.
      </p>

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <FiSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search models..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 dark:text-white"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 text-white dark:bg-blue-600 hover:opacity-90 text-sm">
          <FiFilter /> Filter
        </button>
      </div>

      {/* Model Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>

      {filteredModels.length === 0 && (
        <p className="mt-10 text-center text-gray-500 dark:text-gray-400">No models found.</p>
      )}
    </div>
  );
};

export default ModelMarketplace;
