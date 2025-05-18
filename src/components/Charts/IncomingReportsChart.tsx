import React from 'react';
import ReactApexChart from 'react-apexcharts';

const IncomingReportsChart: React.FC = () => {
  const data = {
    options: {
      chart: { id: 'incoming-reports', toolbar: { show: false } },
      xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      colors: ['#1e3a8a'],
    },
    series: [{ name: 'Reports', data: [12, 19, 15, 10, 22, 18, 14] }],
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-300 dark:border-gray-500 shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Daily Incoming Reports</h3>
      <ReactApexChart options={data.options} series={data.series} type="bar" height={280} />
    </div>
  );
};

export default IncomingReportsChart;
