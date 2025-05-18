import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ResolutionRateChart: React.FC = () => {
  const data = {
    options: {
      chart: { id: 'resolution-rate', toolbar: { show: false } },
      labels: ['Resolved', 'Unresolved'],
      colors: ['#16a34a', '#e11d48'],
    },
    series: [78, 22],
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Resolution Rate</h3>
      <ReactApexChart options={data.options} series={data.series} type="donut" height={280} />
    </div>
  );
};

export default ResolutionRateChart;
