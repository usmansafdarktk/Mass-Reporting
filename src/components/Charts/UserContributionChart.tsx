import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface User {
  name: string;
  reportsSubmitted: number;
  reportsValidated: number;
}

interface Props {
  user: User;
}

const UserContributionChart: React.FC<Props> = ({ user }) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        colors: ["#ffffff"],
      },
    },
    xaxis: {
      categories: ["Reports Submitted", "Reports Validated"],
      labels: {
        style: {
          colors: ["#6B7280", "#6B7280"],
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      min: 0,
      forceNiceScale: true,
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    fill: {
      opacity: 1,
      colors: ["#3B82F6", "#10B981"],
    },
    tooltip: {
      theme: "dark",
    },
    grid: {
      borderColor: "#E5E7EB",
    },
  };

  const series = [
    {
      name: user.name,
      data: [user.reportsSubmitted, user.reportsValidated],
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-600 shadow-sm">
      <h3 className="text-base font-semibold mb-4 text-gray-800 dark:text-white">
        📊 Contribution Summary
      </h3>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default UserContributionChart;
