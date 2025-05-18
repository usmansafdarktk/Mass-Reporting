import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface Props {
  months: string[]; // e.g., ["Jan", "Feb", "Mar", ...]
  submitted: number[]; // Matching values per month
  validated: number[]; // Matching values per month
}

const UserContributionLineChart: React.FC<Props> = ({ months, submitted, validated }) => {
  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "transparent",
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    colors: ["#3B82F6", "#10B981"],
    xaxis: {
      categories: months,
      labels: {
        style: {
          colors: "#6B7280",
        },
      },
    },
    yaxis: {
      title: {
        text: "Reports",
        style: {
          color: "#6B7280",
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          colors: "#6B7280",
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
    legend: {
      position: "top",
      labels: {
        colors: "#6B7280",
      },
    },
    grid: {
      borderColor: "#E5E7EB",
    },
  };

  const series = [
    {
      name: "Submitted",
      data: submitted,
    },
    {
      name: "Validated",
      data: validated,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-600 shadow-sm mt-6">
      <h3 className="text-base font-semibold mb-4 text-gray-800 dark:text-white">
        📈 Monthly Contribution Trend
      </h3>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={300}
      />
    </div>
  );
};

export default UserContributionLineChart;
